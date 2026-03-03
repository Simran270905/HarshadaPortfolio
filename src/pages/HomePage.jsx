import React from "react";
import { PROJECTS, ROWS } from "../data/projects";
import HeroBanner from "../components/HeroBanner";
import ProjectRow from "../components/ProjectRow";

export default function HomePage({ navigate }) {

  const FOOTER_LINKS = [
    { name: "GitHub", url: "https://github.com/yourusername" },
    { name: "LinkedIn", url: "https://linkedin.com/in/yourprofile" },
    { name: "Instagram", url: "https://instagram.com/yourusername" },
    { name: "Drive", url: "https://drive.google.com/your-link" },
    { name: "Resume", url: "https://your-resume-link.com" },
  ];

  return (
    <div>
      {/* ✅ Netflix Hero Slider */}
      <HeroBanner projects={PROJECTS} navigate={navigate} />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          marginTop: "-90px",
        }}
      >
        {ROWS.map((r) => (
          <ProjectRow
            key={r.title}
            title={r.title}
            ids={r.ids}
            navigate={navigate}
          />
        ))}

        {/* Footer */}
        <footer
          style={{
            padding: "40px 4% 30px",
            marginTop: "20px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "28px",
              marginBottom: "16px",
              flexWrap: "wrap",
            }}
          >
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#808080",
                  fontSize: "13px",
                  textDecoration: "none",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#fff")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "#808080")
                }
              >
                {link.name}
              </a>
            ))}
          </div>

          <p
            style={{
              color: "#3a3a3a",
              fontSize: "12px",
            }}
          >
            © 2026 Created By : Simran Kadam
          </p>
        </footer>
      </div>
    </div>
  );
}