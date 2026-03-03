// src/components/EpisodeList.jsx
import React from "react";

export default function EpisodeList({
  episodes = [],
  activeId,
  onSelect,
  accentColor = "#E50914",
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
      {episodes.map((ep, i) => {
        const active = ep.id === activeId;

        return (
          <div
            key={ep.id}
            onClick={() => onSelect(ep)}
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "flex-start",
              padding: "14px 16px",
              background: active
                ? "rgba(255,255,255,0.07)"
                : "transparent",
              borderLeft: active
                ? `3px solid ${accentColor}`
                : "3px solid transparent",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              animation: `fadeLeft 0.4s ease ${i * 0.06}s both`,
            }}
            onMouseEnter={(e) => {
              if (!active)
                e.currentTarget.style.background =
                  "rgba(255,255,255,0.04)";
            }}
            onMouseLeave={(e) => {
              if (!active)
                e.currentTarget.style.background = "transparent";
            }}
          >
            {/* Thumbnail */}
            <div
              style={{
                width: "100px",
                minWidth: "100px",
                height: "62px",
                borderRadius: "4px",
                overflow: "hidden",
                background: "#222",
                position: "relative",
                flexShrink: 0,
              }}
            >
              <img
                src={ep.thumb}
                alt={ep.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              {/* Video indicator */}
              {ep.video && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(0,0,0,0.4)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "18px",
                      color: "#fff",
                      textShadow:
                        "0 0 8px rgba(0,0,0,0.8)",
                    }}
                  >
                    ▶
                  </span>
                </div>
              )}

              {/* Active overlay */}
              {active && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(135deg, ${accentColor}44, transparent)`,
                    border: `2px solid ${accentColor}`,
                    borderRadius: "4px",
                  }}
                />
              )}
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "6px",
                }}
              >
                <div>
                  <span
                    style={{
                      color: "#808080",
                      fontSize: "11px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Episode {i + 1}{" "}
                    {ep.video ? "· VIDEO" : "· GALLERY"}
                  </span>

                  <h4
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: active ? "#fff" : "#ccc",
                      marginTop: "2px",
                    }}
                  >
                    {ep.title}
                  </h4>
                </div>

                <span
                  style={{
                    color: "#808080",
                    fontSize: "12px",
                    flexShrink: 0,
                    marginLeft: "10px",
                  }}
                >
                  {ep.duration}
                </span>
              </div>

              <p
                style={{
                  fontSize: "12px",
                  color: "#808080",
                  lineHeight: 1.6,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {ep.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}