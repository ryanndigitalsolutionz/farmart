
const outer = {
  display: "flex",
  flexDirection: "column",
  gap: 0,
  paddingLeft: 18,
  position: "relative",
};

const line = {
  position: "absolute",
  left: 7,
  top: 8,
  bottom: 8,
  width: 2,
  background: "var(--border, #DCE6D8)",
};

const dot = {
  width: 16,
  height: 16,
  borderRadius: "50%",
  border: "2px solid var(--border, #DCE6D8)",
  background: "#fff",
  flex: "0 0 auto",
  marginTop: 2,
};

const stepInner = {
  display: "flex",
  gap: 12,
  alignItems: "flex-start",
  position: "relative",
  padding: "8px 0",
};

const activeDot = {
  background: "var(--green-700, #2F6D3F)",
  borderColor: "var(--green-700, #2F6D3F)",
};

const content = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
  flex: 1,
};

const title = {
  fontSize: 13.5,
  fontWeight: 600,
  color: "var(--text-dark, #1E2A1F)",
};

const date = {
  fontSize: 11,
  color: "var(--text-muted, #66766A)",
};

const statuses = ["pending", "confirmed", "processing", "shipped", "delivered"];

export default function OrderTimeline({ timeline = [] }) {
  const steps = timeline.length ? timeline : [{ status: "pending", note: "Order placed", date: new Date().toISOString() }];
  return (
    <div style={outer}>
      <span aria-hidden="true" style={line} />
      {steps.map((step, idx) => {
        const lastStatus = steps[steps.length - 1]?.status || "pending";
        const isActive = statuses.indexOf(step.status) >= statuses.indexOf(lastStatus);
        const dateLabel = step.date ? new Date(step.date).toLocaleString("en-KE", { dateStyle: "medium", timeStyle: "short" }) : "";
        return (
          <div key={idx} style={stepInner}>
            <span
              aria-hidden="true"
              style={{
                ...dot,
                ...(isActive ? activeDot : {}),
              }}
            />
            <div style={content}>
              <span style={title}>{step.note || step.status}</span>
              {dateLabel && <span style={date}>{dateLabel}</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
