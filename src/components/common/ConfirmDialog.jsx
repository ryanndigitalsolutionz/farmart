import Modal from "./Modal";
import Button from "./Button";

const panel = {
  textAlign: "center",
  padding: "6px 0 2px",
};

const messageStyle = {
  fontFamily: "var(--font-body, 'Modern Antiqua', serif)",
  fontSize: 15,
  color: "var(--color-text)",
  margin: "14px 0 22px",
  lineHeight: 1.6,
};

const actions = {
  display: "flex",
  gap: 10,
  justifyContent: "center",
};

export default function ConfirmDialog({ isOpen, onClose, onConfirm, message, loading }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Please confirm">
      <div style={panel}>
        <span aria-hidden="true" style={{ fontSize: 34 }}>🗑️</span>
        <p style={messageStyle}>{message}</p>
        <div style={actions}>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} loading={loading}>
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
}
