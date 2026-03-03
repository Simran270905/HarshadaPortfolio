import React, { useState, useEffect } from "react";
import Btn from "../components/Btn";
import Tag from "../components/Tag";
import MatchBadge from "../components/MatchBadge";

export default function HeroBanner({ projects = [], navigate }) {
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);

  const project = projects[index];

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, [index]);

  // 🔁 Auto slide (NO UI CHANGE)
  useEffect(() => {
    if (!projects.length) return;

    const interval = setInterval(() => {
      setReady(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % projects.length);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [projects]);

  if (!project) return null;

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "580px",
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <img
        key={project.id} // 🔥 important for smooth switching
        src={project.poster}
        alt={project.title}
        onLoad={() => setReady(true)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(0.7)",
          opacity: ready ? 1 : 0,
          transition: "opacity 1.2s ease",
        }}
      />

      {/* Overlays (UNCHANGED) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(20,20,20,0.94) 0%, rgba(20,20,20,0.55) 55%, transparent 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "38%",
          background: "linear-gradient(to top, #141414, transparent)",
        }}
      />

      {/* Content (UNCHANGED UI) */}
      <div
        style={{
          position: "absolute",
          bottom: "18%",
          left: "4%",
          maxWidth: "560px",
          opacity: ready ? 1 : 0,
          transform: ready ? "translateY(0)" : "translateY(24px)",
          transition:
            "all 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            background: "rgba(229,9,20,0.12)",
            border: "1px solid rgba(229,9,20,0.5)",
            borderRadius: "4px",
            padding: "4px 12px",
            marginBottom: "14px",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "3px",
            color: "#E50914",
            textTransform: "uppercase",
          }}
        >
          <span style={{ animation: "pulse 2s infinite" }}>●</span>
          Featured Project
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "'Bebas Neue'",
            fontSize: "clamp(52px, 7.5vw, 96px)",
            letterSpacing: "4px",
            lineHeight: 0.92,
            color: "#fff",
            textShadow: "2px 4px 24px rgba(0,0,0,0.7)",
            marginBottom: "16px",
          }}
        >
          {project.title}
        </h1>

        {/* Meta */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "14px",
            flexWrap: "wrap",
          }}
        >
          <MatchBadge value={project.match} />
          <span style={{ color: "#808080", fontSize: "13px" }}>
            {project.year}
          </span>
          <span
            style={{
              border: "1px solid #808080",
              padding: "1px 7px",
              fontSize: "11px",
              color: "#808080",
              borderRadius: "3px",
            }}
          >
            4K
          </span>
          {project.tools.slice(0, 3).map((t) => (
            <Tag key={t} color={project.accentColor}>
              {t}
            </Tag>
          ))}
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: "15px",
            lineHeight: 1.65,
            color: "#ccc",
            marginBottom: "26px",
            fontWeight: 300,
          }}
        >
          {project.description}
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "12px" }}>
          <Btn
            variant="primary"
            onClick={() => navigate(`/project/${project.id}`)}
          >
            ▶ Watch Series
          </Btn>
          <Btn
            variant="secondary"
            onClick={() => navigate(`/project/${project.id}`)}
          >
            ⓘ More Info
          </Btn>
        </div>
      </div>

      {/* Episode count */}
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "4%",
          borderLeft: "4px solid rgba(255,255,255,0.4)",
          paddingLeft: "12px",
          opacity: ready ? 1 : 0,
          transition: "opacity 1.2s ease 0.6s",
        }}
      >
        <div
          style={{
            color: "#ccc",
            fontSize: "13px",
            fontWeight: 400,
          }}
        >
          {project.episodes.length} Episodes
        </div>
      </div>
    </div>
  );
}