
import { useState } from "react";

const outer = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const dropzone = {
  border: "2px dashed var(--border, #DCE6D8)",
  borderRadius: 12,
  padding: 24,
  textAlign: "center",
  color: "var(--text-muted, #66766A)",
  fontSize: 14,
  cursor: "pointer",
};

const previews = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
};

const preview = {
  position: "relative",
  width: 80,
  height: 80,
  borderRadius: 10,
  overflow: "hidden",
  border: "1px solid var(--border, #DCE6D8)",
};

const previewImg = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

const remove = {
  position: "absolute",
  top: 2,
  right: 2,
  background: "rgba(0,0,0,0.5)",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  width: 22,
  height: 22,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontSize: 12,
};

export default function LivestockImageUpload({ value = [], onChange }) {
  const [previewsState, setPreviewsState] = useState([]);

  const handleFiles = (files) => {
    const remaining = 5 - (value?.length || 0) - previewsState.length;
    if (remaining <= 0) return;
    const picked = Array.from(files).slice(0, remaining);
    picked.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewsState((prev) => [...prev, e.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const allPreviews = [...(value || []), ...previewsState];

  const removeAt = (idx) => {
    const removed = allPreviews[idx];
    setPreviewsState((prev) => prev.filter((_, i) => prev[i] !== removed));
    if (typeof removed === "string" && removed.startsWith("data:")) return;
    onChange?.(value?.filter((_, i) => i !== idx) || []);
  };

  return (
    <div style={outer}>
      <label style={dropzone}>
        <div>
          <div style={{ fontSize: 22 }}>📷</div>
          <div>Click to upload images</div>
          <div style={{ fontSize: 12, marginTop: 4 }}>Up to 5 images</div>
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
      </label>
      {!!allPreviews.length && (
        <div style={previews}>
          {allPreviews.map((src, idx) => (
            <div key={idx} style={preview}>
              <img src={src} alt={`Upload ${idx + 1}`} style={previewImg} />
              <button type="button" style={remove} onClick={() => removeAt(idx)} aria-label="Remove image">
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
