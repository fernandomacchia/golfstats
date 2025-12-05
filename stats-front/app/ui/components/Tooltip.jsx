"use client";
import { useState } from "react";

export default function Tooltip({ children }) {
  const [visible, setVisible] = useState(false);

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      {/* Ícono estilo premium */}
      <span
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        style={{
          marginLeft: 6,
          cursor: "pointer",
          fontSize: 12,
          fontWeight: "bold",
          color: "#22c55e",
          border: "1px solid #22c55e",
          borderRadius: "50%",
          padding: "2px 6px",
          lineHeight: "12px",
          userSelect: "none",
          background: "#f0fdf4",
          transition: "0.2s",
        }}
      >
        i
      </span>

      {visible && (
        <div
          style={{
            position: "absolute",
            top: "28px",
            left: 0,
            zIndex: 999,
            width: 280,
            padding: "14px 18px",
            borderRadius: 18,

            /* --- ESTILO PREMIUM CON DEGRADADO --- */
            background: "linear-gradient(135deg, #22c55e 0%, #a3e635 100%)",
            color: "#fff",

            /* SOMBRA SUAVE ELEGANTE */
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.25)",

            fontSize: 14,
            lineHeight: "1.45em",
            letterSpacing: "0.2px",
          }}
        >
          {children}
        </div>
      )}
    </span>
  );
}
