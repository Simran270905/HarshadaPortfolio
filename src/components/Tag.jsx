import React from "react";

export default function Tag({ children, color }) {
  return (
    <span
      style={{
        background: color || "#E50914",
        color: "#fff",
        borderRadius: "3px",
        padding: "2px 8px",
        fontSize: "11px",
        fontWeight: 500,
        marginRight: "4px",
        letterSpacing: "0.5px",
        display: "inline-block",
      }}
    >
      {children}
    </span>
  );
}
