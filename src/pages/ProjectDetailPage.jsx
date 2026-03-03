// src/pages/ProjectDetailPage.jsx
import React, { useState } from "react";
import { PROJECTS } from "../data/projects";

import EpisodePlayer from "../components/EpisodePlayer";
import EpisodeList from "../components/EpisodeList";
import Btn from "../components/Btn";
import MatchBadge from "../components/MatchBadge";

export default function ProjectDetailPage({ projectId, navigate }) {
  const project = PROJECTS.find((p) => p.id === projectId);

  // ✅ FIXED: no useEffect, no warning
  const [activeEp, setActiveEp] = useState(
    project?.episodes?.[0] || null
  );

  const [bannerLoaded, setBannerLoaded] = useState(false);

  if (!project) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          background: "#141414",
          color: "#fff",
        }}
      >
        <h1 style={{ fontSize: "60px", marginBottom: "20px" }}>
          NOT FOUND
        </h1>
        <Btn variant="red" onClick={() => navigate("/home")}>
          ← Back Home
        </Btn>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#141414",
        minHeight: "100vh",
        paddingTop: "68px",
      }}
    >
      {/* HERO */}
      <div
        style={{
          position: "relative",
          height: "80vh",
          overflow: "hidden",
        }}
      >
        {project.previewVideo ? (
          <video
  src={project.previewVideo}
  autoPlay
  muted
  loop
  onLoadedData={() => setBannerLoaded(true)}
  style={{
    position: "absolute",

    // ❌ REMOVE THESE
    // inset: 0,
    // width: "100%",
    // height: "100%",

    // ✅ ADD THIS
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    maxWidth: "100%",
    maxHeight: "100%",

    objectFit: "contain", // keeps aspect ratio
    filter: "brightness(0.45)",
    background: "#000",
  }}
/>
        ) : (
          <img
            src={project.thumb}
            alt={project.title}
            onLoad={() => setBannerLoaded(true)}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.4)",
            }}
          />
        )}

        {/* overlays */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(20,20,20,0.95) 0%, rgba(20,20,20,0.5) 60%, transparent 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "50%",
            background: "linear-gradient(to top, #141414, transparent)",
          }}
        />

        {/* content */}
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            left: "4%",
            maxWidth: "600px",
            opacity: bannerLoaded ? 1 : 0,
            transform: bannerLoaded
              ? "translateY(0)"
              : "translateY(30px)",
            transition: "all 0.8s ease",
          }}
        >
          <span
            onClick={() => navigate("/home")}
            style={{ color: "#aaa", cursor: "pointer" }}
          >
            ← Home
          </span>

          <h1
            style={{
              fontSize: "72px",
              fontFamily:
                "'Bebas Neue', 'Helvetica Neue', Arial, sans-serif",
              letterSpacing: "4px",
              fontWeight: "bold",
              margin: "10px 0",
            }}
          >
            {project.title}
          </h1>

          <div
            style={{
              display: "flex",
              gap: "14px",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <MatchBadge value={project.match} />
            <span style={{ color: "#ccc" }}>{project.year}</span>

            <span
              style={{
                border: "1px solid #888",
                padding: "2px 6px",
                fontSize: "12px",
              }}
            >
              HD
            </span>

            <span style={{ color: "#aaa" }}>
              {project?.episodes?.length || 0} Episodes
            </span>
          </div>

          <p
            style={{
              color: "#ccc",
              lineHeight: "1.6",
              marginBottom: "20px",
            }}
          >
            {project.description}
          </p>

          <div style={{ display: "flex", gap: "10px" }}>
            <Btn onClick={() => setActiveEp(project?.episodes?.[0])}>
              ▶ Play
            </Btn>

            {["+", "👍", "↗"].map((icon) => (
              <button
                key={icon}
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  border: "2px solid rgba(255,255,255,0.4)",
                  background: "rgba(0,0,0,0.6)",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ padding: "40px 4%" }}>
        {activeEp && (
          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ color: "#aaa" }}>
              Episode{" "}
              {(project?.episodes || []).indexOf(activeEp) + 1} of{" "}
              {project?.episodes?.length || 0}
            </h3>

            <h2 style={{ fontSize: "28px" }}>
              {activeEp?.title}
            </h2>

            <p style={{ color: "#aaa" }}>
              {activeEp?.description}
            </p>
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 360px",
            gap: "30px",
          }}
        >
          <EpisodePlayer episode={activeEp} />

          <EpisodeList
            episodes={project?.episodes || []}
            activeId={activeEp?.id}
            onSelect={setActiveEp}
            accentColor={project?.accentColor}
          />
        </div>

        {/* MORE */}
<div style={{ marginTop: "60px" }}>
  <h3 style={{ marginBottom: "20px" }}>More Like This</h3>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 300px)",
      gap: "18px",
      justifyContent: "start",
    }}
  >
    {PROJECTS.filter((p) => p.id !== project.id)
      .slice(0, 4)
      .map((p) => (
        <div
          key={p.id}
          onClick={() => navigate(`/project/${p.id}`)}
          style={{
            width: "300px",
            height: "180px", // ✅ fixed consistent height
            cursor: "pointer",
            borderRadius: "10px",
            overflow: "hidden",
            position: "relative",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.06)";
            e.currentTarget.style.zIndex = "10";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.zIndex = "1";
          }}
        >
          {/* IMAGE */}
          <img
            src={p.poster}
            alt={p.title}
            style={{
              width: "100%", // ✅ FIXED (was 600px ❌)
              height: "100%", // ✅ match container
              objectFit: "cover",
            }}
          />

          {/* DARK OVERLAY */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.2), transparent)",
            }}
          />

          {/* TITLE */}
          <p
            style={{
              position: "absolute",
              bottom: "12px",
              left: "12px",
              right: "12px",
              fontSize: "14px",
              color: "#fff",
              fontWeight: "500",
              lineHeight: "1.3",
            }}
          >
            {p.title}
          </p>
        </div>
      ))}
  </div>
</div>
      </div>
    </div>
  );
}