import React from "react";

const skills = [
  { name: "Adobe Photoshop", level: 95 },
  { name: "Illustrator", level: 92 },
  { name: "Premiere Pro", level: 88 },
  { name: "After Effects", level: 85 },
];

const AboutSection = () => {
  return (
    <section
      style={{
        padding: "80px 4%",
        color: "#fff",
      }}
    >
      {/* TITLE */}
      <h2
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span
          style={{
            width: "4px",
            height: "20px",
            background: "#E50914",
          }}
        />
        ABOUT THE CREATOR
      </h2>

      {/* DESCRIPTION */}
      <p
        style={{
          color: "#aaa",
          maxWidth: "600px",
          marginBottom: "40px",
          lineHeight: "1.6",
        }}
      >
        Passionate graphic designer from Mumbai with 5+ years experience in
        branding, UI/UX, and motion graphics. Creating cinematic,
        culture-driven visuals.
      </p>

      {/* SKILLS ROW */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          overflowX: "auto",
        }}
      >
        {skills.map((skill) => (
          <div
            key={skill.name}
            style={{
              minWidth: "220px",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            <div
              style={{
                background: "#181818",
                borderRadius: "6px",
                overflow: "hidden",
                boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
              }}
            >
              {/* TOP */}
              <div
                style={{
                  height: "120px",
                  background:
                    "linear-gradient(135deg, rgba(229,9,20,0.3), black)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "24px",
                    opacity: 0.8,
                    letterSpacing: "2px",
                  }}
                >
                  {skill.name.split(" ")[0]}
                </span>
              </div>

              {/* INFO */}
              <div style={{ padding: "12px" }}>
                <h3 style={{ fontSize: "14px", marginBottom: "6px" }}>
                  {skill.name}
                </h3>

                <p
                  style={{
                    color: "#2ECC71",
                    fontSize: "12px",
                    marginBottom: "6px",
                  }}
                >
                  {skill.level}% Match
                </p>

                {/* PROGRESS BAR */}
                <div
                  style={{
                    height: "4px",
                    background: "#333",
                    borderRadius: "2px",
                  }}
                >
                  <div
                    style={{
                      width: `${skill.level}%`,
                      height: "100%",
                      background: "#E50914",
                      borderRadius: "2px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;