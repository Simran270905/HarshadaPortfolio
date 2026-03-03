// src/components/Btn.jsx
import React from "react";

export default function Btn({ children, onClick, variant = "primary", style = {} }) {
  const base = {
    padding: "10px 22px",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    border: "none",
    letterSpacing: "0.5px",
    transition: "all 0.2s ease",
  };

  const variants = {
    primary: {
      background: "#fff",
      color: "#000",
    },
    secondary: {
      background: "rgba(255,255,255,0.15)",
      color: "#fff",
    },
    red: {
      background: "#E50914",
      color: "#fff",
    },
    ghost: {
      background: "transparent",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.4)",
    },
  };

  return (
    <button
      onClick={onClick}
      style={{ ...base, ...variants[variant], ...style }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = "0.85";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = "1";
      }}
    >
      {children}
    </button>
  );
}