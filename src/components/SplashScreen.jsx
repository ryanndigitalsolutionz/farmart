import { motion } from "framer-motion";

export default function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#14201a",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ textAlign: "center" }}
      >
        <div
          style={{
            fontFamily: "var(--font-display, 'IBM Plex Serif', serif)",
            fontSize: 56,
            fontWeight: 700,
            color: "#eaf3e6",
            lineHeight: 1,
          }}
        >
          Farmart
        </div>
        <div
          style={{
            fontFamily: "var(--font-display, 'IBM Plex Serif', serif)",
            fontSize: 16,
            fontWeight: 500,
            color: "#9db3a4",
            textAlign: "right",
            marginTop: 4,
          }}
        >
          Admin
        </div>
      </motion.div>
    </motion.div>
  );
}