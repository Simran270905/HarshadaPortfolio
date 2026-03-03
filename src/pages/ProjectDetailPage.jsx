import React, { useState, useEffect } from "react";
import { PROJECTS } from "../data/projects";

import EpisodePlayer from "../components/EpisodePlayer";
import EpisodeList from "../components/EpisodeList";
import Btn from "../components/Btn";
import MatchBadge from "../components/MatchBadge";

export default function ProjectDetailPage({ projectId, navigate }) {
  const project = PROJECTS.find((p) => p.id === projectId);

  const [activeEp, setActiveEp] = useState(
    project?.episodes?.[0] || null
  );
  const [bannerLoaded, setBannerLoaded] = useState(false);

  // ✅ RESPONSIVE DETECTION
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          height: isMobile ? "60vh" : "80vh",
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
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
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

        {/* CONTENT */}
        <div
          style={{
            position: "absolute",
            bottom: isMobile ? "10%" : "15%",
            left: "4%",
            maxWidth: isMobile ? "90%" : "600px",
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
              fontSize: isMobile ? "36px" : "72px",
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
              flexWrap: "wrap",
              gap: "10px",
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

          <p style={{ color: "#ccc", lineHeight: "1.6" }}>
            {project.description}
          </p>

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <Btn onClick={() => setActiveEp(project?.episodes?.[0])}>
              ▶ Play
            </Btn>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ padding: isMobile ? "20px 4%" : "40px 4%" }}>
        {activeEp && (
          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ color: "#aaa" }}>
              Episode{" "}
              {(project?.episodes || []).indexOf(activeEp) + 1} of{" "}
              {project?.episodes?.length || 0}
            </h3>

            <h2 style={{ fontSize: isMobile ? "20px" : "28px" }}>
              {activeEp?.title}
            </h2>

            <p style={{ color: "#aaa" }}>
              {activeEp?.description}
            </p>
          </div>
        )}

        {/* GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 360px",
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
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "18px",
            }}
          >
            {PROJECTS.filter((p) => p.id !== project.id)
              .slice(0, 4)
              .map((p) => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/project/${p.id}`)}
                  style={{
                    width: "100%",
                    height: "180px",
                    cursor: "pointer",
                    borderRadius: "10px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <img
                    src={p.poster}
                    alt={p.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.2), transparent)",
                    }}
                  />

                  <p
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      left: "12px",
                      right: "12px",
                      fontSize: "14px",
                      color: "#fff",
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