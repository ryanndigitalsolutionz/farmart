import Button from "../common/Button";
import { PAYMENT_METHODS } from "../../constants/payments";

const card = {
  background: "#fff",
  borderRadius: 14,
  border: "1px solid var(--border, #DCE6D8)",
  padding: 18,
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const title = {
  margin: 0,
  fontFamily: "var(--font-display, 'Fraunces', serif)",
  fontSize: 16,
  fontWeight: 600,
};

const options = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const option = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid var(--border, #DCE6D8)",
  cursor: "pointer",
  fontSize: 14,
};

const selected = {
  borderColor: "var(--green-700, #2F6D3F)",
  background: "var(--green-100, #EAF3E6)",
};

const radio = {
  width: 18,
  height: 18,
  borderRadius: "50%",
  border: "2px solid var(--green-700, #2F6D3F)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: "0 0 auto",
};

const dot = {
  width: 8,
  height: 8,
  borderRadius: "50%",
  background: "var(--green-700, #2F6D3F)",
};

export default function PaymentForm({ selectedMethod, onSelectMethod }) {
  return (
    <div style={card}>
      <h3 style={title}>Payment method</h3>
      <div style={options}>
        {PAYMENT_METHODS.map((method) => (
          <button
            key={method.id}
            type="button"
            style={{
              ...option,
              ...(selectedMethod === method.id ? selected : {}),
            }}
            onClick={() => onSelectMethod?.(method.id)}
          >
            <span style={radio}>
              {selectedMethod === method.id && <span style={dot} />}
            </span>
            <span>{method.icon} {method.label}</span>
          </button>
        ))}
      </div>
      <Button fullWidth disabled={!selectedMethod}>
        Pay now
      </Button>
    </div>
  );
}
