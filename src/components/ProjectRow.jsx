import React, { useRef, useState, useEffect } from "react";
import { PROJECTS } from "../data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectRow({ title, ids, navigate }) {
  const rowRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [hovered, setHovered] = useState(null);

  const isMostFeatured = title === "Most-Featured";

  const projects = ids
    .map((id) => PROJECTS.find((p) => p.id === id))
    .filter(Boolean);

  const checkScroll = () => {
    const el = rowRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 5);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  };

  const scroll = (dir) => {
    rowRef.current?.scrollBy({
      left: dir * 900,
      behavior: "smooth",
    });
    setTimeout(checkScroll, 400);
  };

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    checkScroll();
    el.addEventListener("scroll", checkScroll);

    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <section style={{ marginBottom: "50px" }}>
      {/* TITLE */}
      <h2
        style={{
          paddingLeft: "4%",
          marginBottom: "14px",
          fontSize: "22px",
          fontWeight: "700",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {title}
        <span
          style={{
            fontSize: "13px",
            color: "#54b3d6",
            cursor: "pointer",
            opacity: 0.8,
          }}
        >
          Explore All ›
        </span>
      </h2>

      <div style={{ position: "relative" }}>
        {/* LEFT ARROW */}
        {canLeft && (
          <button
            onClick={() => scroll(-1)}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "5%",
              minWidth: "60px",
              background:
                "linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0))",
              border: "none",
              color: "#fff",
              fontSize: "40px",
              cursor: "pointer",
              zIndex: 20,
            }}
          >
            ‹
          </button>
        )}

        {/* ROW */}
        <div
          ref={rowRef}
          style={{
            display: "flex",
            gap: "10px",
            overflowX: "auto",
            padding: "30px 4%",
            scrollBehavior: "smooth",
          }}
        >
          {projects.map((p, i) => {
            const isActive = hovered === i;

            return (
              <div
                key={p.id}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "relative",
                  transition: "transform 0.35s ease",
                  transform: isActive ? "scale(1.25)" : "scale(1)",
                  zIndex: isActive ? 10 : 1,
                }}
              >
                {/* 🔥 ONLY IMAGE SCALE CONTROL */}
                <div
                  style={{
                    overflow: "hidden",
                    borderRadius: "8px",
                  }}
                >
                  <ProjectCard
                    project={p}
                    index={i}
                    navigate={navigate}
                    imageScale={isMostFeatured ? 1.2 : 1} // 👈 key prop
                  />
                </div>

                {/* 🔴 RED DIVIDER ONLY FOR MOST-FEATURED */}
                {isMostFeatured && i !== projects.length - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      right: "-5px",
                      top: "20%",
                      height: "60%",
                      width: "2px",
                      background: "#e50914",
                    }}
                  />
                )}

                {/* NETFLIX OVERLAY */}
                {isActive && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
                      borderRadius: "8px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      padding: "10px",
                    }}
                  >
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button
                        style={{
                          background: "#fff",
                          color: "#000",
                          border: "none",
                          padding: "4px 10px",
                          fontSize: "11px",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/project/${p.id}`);
                        }}
                      >
                        ▶ Play
                      </button>

                      <button
                        style={{
                          border: "1px solid #fff",
                          background: "transparent",
                          color: "#fff",
                          padding: "4px 10px",
                          fontSize: "11px",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        + List
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* RIGHT ARROW */}
        {canRight && (
          <button
            onClick={() => scroll(1)}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "5%",
              minWidth: "60px",
              background:
                "linear-gradient(to left, rgba(0,0,0,0.9), rgba(0,0,0,0))",
              border: "none",
              color: "#fff",
              fontSize: "40px",
              cursor: "pointer",
              zIndex: 20,
            }}
          >
            ›
          </button>
        )}
      </div>
    </section>
  );
}