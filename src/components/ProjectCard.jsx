import React, { useState } from "react";

export default function ProjectCard({
  project,
  navigate,
  imageScale = 1, // 👈 receives from ProjectRow
}) {
  const [hovered, setHovered] = useState(false);

  if (!project) return null;

  return (
    <div
      onClick={() => navigate(`/project/${project?.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "220px",
        cursor: "pointer",
        transition: "transform 0.3s ease",
        transform: hovered ? "scale(1.08)" : "scale(1)",
      }}
    >
      {/* IMAGE */}
      <div
        style={{
          width: "100%",
          height: "130px",
          overflow: "hidden",
          borderRadius: "6px",
        }}
      >
        <img
          src={project?.thumb}
          alt={project?.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transition: "transform 0.4s ease",

            // ✅ ONLY CHANGE — combines hover + Most-Featured scaling
            transform: `scale(${imageScale * (hovered ? 1.15 : 1)})`,
          }}
        />
      </div>

      {/* TITLE */}
      <h4
        style={{
          whiteSpace: "pre-line",
          marginTop: "8px",
          fontFamily: "'Bebas Neue', 'Helvetica Neue', Arial, serif",
          fontWeight: 500,
          letterSpacing: "1.5px",
          fontSize: "18px",
          transition: "color 0.3s",
          color: hovered ? "#fff" : "#ddd",
          textAlign: "center",
        }}
      >
        {project?.title}
      </h4>

      {/* CATEGORY */}
      <p style={{ color: "#aaa", fontSize: "13px", textAlign: "center" }}>
        {project?.category}
      </p>

      {/* TECH STACK */}
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "center" }}>
        {(project?.techStack || []).slice(0, 3).map((tech, i) => (
          <span
            key={i}
            style={{
              background: "#222",
              color: "#fff",
              padding: "2px 8px",
              borderRadius: "12px",
              fontSize: "11px",
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}