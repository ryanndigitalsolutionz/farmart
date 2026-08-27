import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../api";
import { X } from "lucide-react";

const LIVESTOCK_TYPES = [
  "cattle", "goat", "sheep", "poultry", "pig", "other"
];
const GENDERS = ["male", "female", "mixed"];
const WEIGHT_UNITS = ["kg", "lbs"];

const emptyForm = {
  type: "cattle",
  breed: "",
  title: "",
  description: "",
  price: "",
  quantity: "1",
  age: "",
  gender: "male",
  weight: "",
  weightUnit: "kg",
  location: "",
  images: [],
  healthInfo: "",
  availability: "available",
  status: "active",
};

export default function CreateListings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(emptyForm);
  const [previewImages, setPreviewImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    async function load() {
      try {
        const listing = await api.getListing(id);
        if (!cancelled && listing) {
          setForm({
            type: listing.type || "cattle",
            breed: listing.breed || "",
            title: listing.title || "",
            description: listing.description || "",
            price: String(listing.price ?? ""),
            quantity: String(listing.quantity ?? 1),
            age: listing.age || "",
            gender: listing.gender || "male",
            weight: String(listing.weight ?? ""),
            weightUnit: listing.weightUnit || "kg",
            location: listing.location || "",
            images: listing.images || [],
            healthInfo: "",
            availability: listing.status === "active" ? "available" : "unavailable",
            status: listing.status || "active",
          });
          setPreviewImages(listing.images || []);
        }
      } catch {
        if (!cancelled) setError("Failed to load listing.");
      }
    }
    load();
    return () => { cancelled = true; };
  }, [id]);

  const handleChange = useCallback((field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const handleImageChange = useCallback((e) => {
    const files = Array.from(e.target.files || []);
    const newPreviews = [];
    let processed = 0;
    if (files.length === 0) return;
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        newPreviews.push(reader.result);
        processed += 1;
        if (processed === files.length) {
          setPreviewImages((prev) => [...prev, ...newPreviews]);
          setForm((prev) => ({
            ...prev,
            images: [...prev.images, ...files.map((f) => URL.createObjectURL(f))],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const removeImage = useCallback((index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  }, []);

  const validate = useCallback(() => {
    const errs = {};
    if (!form.breed.trim()) errs.breed = "Breed is required.";
    if (!form.title.trim()) errs.title = "Title is required.";
    if (!form.description.trim()) errs.description = "Description is required.";
    if (!form.price || Number(form.price) <= 0) errs.price = "Enter a valid price.";
    if (!form.quantity || Number(form.quantity) < 1) errs.quantity = "Enter a valid quantity.";
    if (!form.age.trim()) errs.age = "Age is required.";
    if (!form.location.trim()) errs.location = "Location is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [form]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      setSuccess("");
      if (!validate()) return;
      setSaving(true);
      try {
        const payload = {
          ...form,
          price: Number(form.price),
          quantity: Number(form.quantity),
          weight: Number(form.weight) || 0,
          farmerId: user?.id,
          farmerName: user?.farmName || user?.name,
          images: previewImages,
          status: form.availability === "available" ? "active" : "inactive",
        };
        if (isEdit && id) {
          await api.updateListing(id, payload);
          setSuccess("Listing updated successfully.");
        } else {
          await api.createListing(payload);
          setForm(emptyForm);
          setPreviewImages([]);
          setSuccess("Listing created successfully.");
        }
        setTimeout(() => navigate("/farmer/listings"), 1200);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setSaving(false);
      }
    },
    [form, previewImages, isEdit, id, user, navigate, validate]
  );

  return (
    <div>
      <PageHeader
        title={isEdit ? "Edit Listing" : "Create New Listing"}
        subtitle={isEdit ? "Update your livestock listing" : "List your livestock for sale"}
      />

      {error && (
        <p
          style={{
            color: "#B2503E",
            background: "#FFF5F3",
            border: "1px solid #F0C9C1",
            borderRadius: 10,
            padding: "10px 14px",
            marginBottom: 16,
            fontSize: 13,
            fontFamily: "Modern Antiqua, serif",
          }}
        >
          {error}
        </p>
      )}
      {success && (
        <p
          style={{
            color: "#2F6D3F",
            background: "#EAF3E6",
            border: "1px solid #DCE6D8",
            borderRadius: 10,
            padding: "10px 14px",
            marginBottom: 16,
            fontSize: 13,
            fontFamily: "Modern Antiqua, serif",
          }}
        >
          {success}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: 720,
          background: "var(--white, #fff)",
          border: "1px solid var(--border, #DCE6D8)",
          borderRadius: 14,
          padding: "22px 24px",
          display: "grid",
          gap: 16,
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <Field label="Livestock Type" required error={errors.type}>
            <select
              value={form.type}
              onChange={handleChange("type")}
              style={inputStyle}
            >
              {LIVESTOCK_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Breed" required error={errors.breed}>
            <input
              value={form.breed}
              onChange={handleChange("breed")}
              placeholder="e.g. Boran"
              style={inputStyle}
            />
          </Field>
        </div>

        <Field label="Title" required error={errors.title}>
          <input
            value={form.title}
            onChange={handleChange("title")}
            placeholder="Short descriptive title"
            style={inputStyle}
          />
        </Field>

        <Field label="Description" required error={errors.description}>
          <textarea
            value={form.description}
            onChange={handleChange("description")}
            rows={3}
            placeholder="Describe condition, health, etc."
            style={{ ...inputStyle, minHeight: 80 }}
          />
        </Field>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
          <Field label="Price (KES)" required error={errors.price}>
            <input
              type="number"
              value={form.price}
              onChange={handleChange("price")}
              placeholder="0"
              style={inputStyle}
            />
          </Field>
          <Field label="Quantity" required error={errors.quantity}>
            <input
              type="number"
              value={form.quantity}
              onChange={handleChange("quantity")}
              placeholder="1"
              min="1"
              style={inputStyle}
            />
          </Field>
          <Field label="Age" required error={errors.age}>
            <input
              value={form.age}
              onChange={handleChange("age")}
              placeholder="e.g. 2 years"
              style={inputStyle}
            />
          </Field>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
          <Field label="Gender" error={errors.gender}>
            <select value={form.gender} onChange={handleChange("gender")} style={inputStyle}>
              {GENDERS.map((g) => (
                <option key={g} value={g}>
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Weight" error={errors.weight}>
            <input
              type="number"
              value={form.weight}
              onChange={handleChange("weight")}
              placeholder="0"
              style={inputStyle}
            />
          </Field>
          <Field label="Weight Unit">
            <select value={form.weightUnit} onChange={handleChange("weightUnit")} style={inputStyle}>
              {WEIGHT_UNITS.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Location" required error={errors.location}>
          <input
            value={form.location}
            onChange={handleChange("location")}
            placeholder="Town, County"
            style={inputStyle}
          />
        </Field>

        <Field label="Health Info">
          <textarea
            value={form.healthInfo}
            onChange={handleChange("healthInfo")}
            rows={2}
            placeholder="Vaccinations, vet records, etc."
            style={{ ...inputStyle, minHeight: 60 }}
          />
        </Field>

        <Field label="Images">
          <div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              style={{ fontSize: 12, fontFamily: "Modern Antiqua, serif" }}
            />
            {previewImages.length > 0 && (
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  marginTop: 10,
                  flexWrap: "wrap",
                }}
              >
                {previewImages.map((src, idx) => (
                  <div
                    key={idx}
                    style={{
                      position: "relative",
                      width: 80,
                      height: 80,
                      borderRadius: 10,
                      overflow: "hidden",
                      border: "1px solid var(--border, #DCE6D8)",
                    }}
                  >
                    <img
                      src={src}
                      alt={`preview-${idx}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      style={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                        background: "rgba(0,0,0,0.6)",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        width: 20,
                        height: 20,
                        fontSize: 10,
                        cursor: "pointer",
                      }}
                    >
                      <X size={10} strokeWidth={3} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Field>

        <Field label="Availability">
          <select value={form.availability} onChange={handleChange("availability")} style={inputStyle}>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </Field>

        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "flex-end",
            marginTop: 6,
          }}
        >
          <button
            type="button"
            onClick={() => navigate("/farmer/listings")}
            style={{
              background: "transparent",
              color: "var(--text-muted, #66766A)",
              border: "1px solid var(--border, #DCE6D8)",
              borderRadius: 10,
              padding: "10px 16px",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "Modern Antiqua, serif",
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            style={{
              background: "#277a44",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "10px 20px",
              fontSize: 13,
              fontWeight: 700,
              cursor: saving ? "not-allowed" : "pointer",
              opacity: saving ? 0.7 : 1,
              fontFamily: "Modern Antiqua, serif",
            }}
          >
            {saving ? "Saving…" : isEdit ? "Update Listing" : "Publish Listing"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, required, error, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: "var(--text-dark, #1E2A1F)",
          fontFamily: "Modern Antiqua, serif",
        }}
      >
        {label}
        {required && <span style={{ color: "#B2503E" }}> *</span>}
      </label>
      {children}
      {error && (
        <span
          style={{
            fontSize: 11,
            color: "#B2503E",
            fontFamily: "Modern Antiqua, serif",
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  border: "1px solid var(--border, #DCE6D8)",
  borderRadius: 8,
  padding: "9px 12px",
  fontSize: 13.5,
  fontFamily: "Modern Antiqua, serif",
  color: "#17351f",
  background: "#f7faf7",
  outline: "none",
};
