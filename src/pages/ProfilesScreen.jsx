// src/pages/ProfilesScreen.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { PROFILES } from "../data/projects";

export default function ProfilesScreen({ navigate }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#141414",
      }}
    >
      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          fontFamily: "'Bebas Neue'",
          fontSize: "48px",
          letterSpacing: "4px",
          color: "#fff",
          marginBottom: "10px",
        }}
      >
        Who's Watching?
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          color: "#808080",
          fontSize: "14px",
          marginBottom: "60px",
        }}
      >
        Select your profile
      </motion.p>

      {/* PROFILES */}
      <div
        style={{
          display: "flex",
          gap: "32px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {(PROFILES || []).map((p, i) => (
          <motion.div
            key={p?.name || i}
            onClick={() => navigate("/home")}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            whileHover={{ scale: 1.08 }}
            style={{
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            {/* AVATAR */}
            <div
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "8px",
                overflow: "hidden",
                border:
                  hovered === i
                    ? "4px solid white"
                    : "4px solid transparent",
                transition: "all 0.3s ease",
                boxShadow:
                  hovered === i
                    ? `0 0 30px ${p?.color || "#fff"}55`
                    : "none",
              }}
            >
              <img
                src={p?.image}
                alt={p?.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* NAME */}
            <p
              style={{
                marginTop: "14px",
                fontSize: "16px",
                color: hovered === i ? "#fff" : "#808080",
                transition: "color 0.3s",
              }}
            >
              {p?.name}
            </p>
          </motion.div>
        ))}
      </div>

      {/* MANAGE BUTTON */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => navigate("/manage")}
        style={{
          marginTop: "60px",
          background: "none",
          border: "2px solid #808080",
          color: "#808080",
          padding: "10px 36px",
          borderRadius: "4px",
          fontSize: "14px",
          letterSpacing: "2px",
          cursor: "pointer",
          transition: "all 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#fff";
          e.currentTarget.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#808080";
          e.currentTarget.style.color = "#808080";
        }}
      >
        MANAGE PROFILES
      </motion.button>
    </div>
  );
}