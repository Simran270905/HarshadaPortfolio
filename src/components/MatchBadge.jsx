// src/components/MatchBadge.jsx
import React from "react";

export default function MatchBadge({ value }) {
  return (
    <span
      style={{
        color: "#46d369",
        fontSize: "13px",
        fontWeight: 600,
        letterSpacing: "0.5px",
      }}
    >
      {value}% Match
    </span>
  );
}