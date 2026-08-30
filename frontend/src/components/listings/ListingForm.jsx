import { useState } from "react";
import Input from "../common/Input";
import Select from "../common/Select";
import Textarea from "../common/Textarea";

const form = {
  background: "#fff",
  borderRadius: 14,
  border: "1px solid var(--border, #DCE6D8)",
  padding: 20,
  display: "flex",
  flexDirection: "column",
  gap: 14,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 14,
};

const actions = {
  display: "flex",
  gap: 10,
  justifyContent: "flex-end",
  marginTop: 8,
};

export default function ListingForm({
  initialValues = {},
  onChange,
  onSubmit,
  loading,
  submitLabel = "Save listing",
}) {
  const [values, setValues] = useState({
    title: initialValues.title || "",
    type: initialValues.type || "cattle",
    breed: initialValues.breed || "",
    price: initialValues.price || "",
    quantity: initialValues.quantity || 1,
    age: initialValues.age || "",
    gender: initialValues.gender || "",
    weight: initialValues.weight || "",
    weightUnit: initialValues.weightUnit || "kg",
    location: initialValues.location || "",
    description: initialValues.description || "",
  });

  const update = (field) => (e) => {
    const next = { ...values, [field]: e.target.value };
    setValues(next);
    onChange?.(next);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(values);
  };

  return (
    <form style={form} onSubmit={handleSubmit}>
      <div style={grid}>
        <Input label="Title" name="title" value={values.title} onChange={update("title")} required placeholder="e.g. Healthy Boran Bull" />
        <Select
          label="Type"
          name="type"
          value={values.type}
          onChange={update("type")}
          options={[
            { value: "cattle", label: "Cattle" },
            { value: "goat", label: "Goat" },
            { value: "sheep", label: "Sheep" },
            { value: "poultry", label: "Poultry" },
          ]}
        />
        <Input label="Breed" name="breed" value={values.breed} onChange={update("breed")} required />
        <Input label="Price (KES)" name="price" type="number" value={values.price} onChange={update("price")} required />
        <Input label="Quantity" name="quantity" type="number" value={values.quantity} onChange={update("quantity")} />
        <Input label="Age" name="age" value={values.age} onChange={update("age")} placeholder="e.g. 2 years" />
        <Select label="Gender" name="gender" value={values.gender} onChange={update("gender")} options={[
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "mixed", label: "Mixed" },
        ]} />
        <Input label="Weight" name="weight" type="number" value={values.weight} onChange={update("weight")} />
        <Select label="Weight unit" name="weightUnit" value={values.weightUnit} onChange={update("weightUnit")} options={[
          { value: "kg", label: "kg" },
          { value: "lbs", label: "lbs" },
        ]} />
        <Input label="Location" name="location" value={values.location} onChange={update("location")} required />
      </div>
      <Textarea label="Description" name="description" value={values.description} onChange={update("description")} placeholder="Describe the livestock..." />
      <div style={actions}>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 18px",
            borderRadius: 10,
            border: "none",
            background: "var(--green-700, #2F6D3F)",
            color: "#fff",
            fontSize: 14,
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
