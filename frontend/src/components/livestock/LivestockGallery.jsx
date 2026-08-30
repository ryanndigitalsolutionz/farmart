
import { useState } from "react";

const outer = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const main = {
  width: "100%",
  height: 360,
  borderRadius: 12,
  background: "var(--green-100, #EAF3E6)",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const mainImg = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

const thumbs = {
  display: "flex",
  gap: 10,
  overflowX: "auto",
};

const thumb = {
  width: 64,
  height: 64,
  borderRadius: 10,
  border: "2px solid transparent",
  overflow: "hidden",
  cursor: "pointer",
  background: "var(--green-100, #EAF3E6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: "0 0 auto",
};

const activeThumb = {
  borderColor: "var(--green-700, #2F6D3F)",
};

const thumbImg = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

const empty = {
  fontSize: 32,
};

export default function LivestockGallery({ images = [] }) {
  const [active, setActive] = useState(0);
  const src = images?.[active] || null;
  return (
    <div style={outer}>
      <div style={main}>
        {src ? (
          <img src={src} alt={`Gallery ${active + 1}`} style={mainImg} />
        ) : (
          <span aria-hidden="true" style={empty}>🐄</span>
        )}
      </div>
      {images.length > 1 && (
        <div style={thumbs}>
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActive(idx)}
              style={{ ...thumb, ...(active === idx ? activeThumb : {}) }}
              aria-label={`Image ${idx + 1}`}
            >
              <img src={img} alt="" style={thumbImg} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
