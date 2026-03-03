import React from "react";

const experience = [
  {
    role: "Senior Graphic Designer",
    company: "PixelCraft Studio, Mumbai",
    duration: "2023 - Present",
    desc: "Lead designer for 20+ premium client projects including brand identity, UI/UX, and motion graphics.",
    achievements: [
      "Managed 5-member design team",
      "Increased client retention by 35%",
      "Featured in Behance Top 100",
    ],
  },
  {
    role: "Graphic Designer",
    company: "Creative Hub Agency",
    duration: "2021 - 2023",
    desc: "Created branding and marketing designs for 50+ clients.",
    achievements: [
      "Designed 200+ graphics",
      "Boosted engagement by 60%",
      "Best Young Designer 2022",
    ],
  },
  {
    role: "Junior Designer & Intern",
    company: "DesignVerse Studio",
    duration: "2019 - 2021",
    desc: "Worked on Adobe Suite, UI design, and cultural projects.",
    achievements: [
      "Learned motion design",
      "Created Marathi designs",
      "Promoted in 6 months",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section style={styles.section}>
      {/* GOOGLE FONTS */}
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:wght@300;400;600&display=swap"
        rel="stylesheet"
      />

      <h2 style={styles.title}>PROFESSIONAL JOURNEY</h2>

      <div className="timeline">
        {experience.map((exp, index) => (
          <div key={index} className="timeline-item">
            <div className="dot"></div>

            <div className="card">
              <p className="duration">{exp.duration}</p>
              <h3 className="role">{exp.role}</h3>
              <p className="company">{exp.company}</p>
              <p className="desc">{exp.desc}</p>

              <div className="achievements">
                {exp.achievements.map((a, i) => (
                  <span key={i}>• {a}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        body {
          font-family: 'Poppins', sans-serif;
        }

        .timeline {
          position: relative;
          margin-left: 4%;
          padding-left: 30px;
        }

        .timeline::before {
          content: "";
          position: absolute;
          left: 10px;
          top: 0;
          width: 2px;
          height: 100%;
          background: linear-gradient(to bottom, #e50914, transparent);
        }

        .timeline-item {
          position: relative;
          margin-bottom: 50px;
        }

        .dot {
          position: absolute;
          left: -1px;
          width: 18px;
          height: 18px;
          background: #e50914;
          border-radius: 50%;
          box-shadow: 0 0 12px #e50914;
        }

        .card {
          background: linear-gradient(145deg, #1a1a1a, #111);
          padding: 24px;
          border-radius: 14px;
          margin-left: 40px;
          transition: 0.3s;
          cursor: pointer;
        }

        .card:hover {
          transform: translateX(10px);
          box-shadow: 0 10px 30px rgba(229,9,20,0.3);
        }

        .duration {
          color: #e50914;
          font-size: 12px;
          letter-spacing: 1px;
        }

        .role {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 1px;
          margin: 5px 0;
        }

        .company {
          color: #aaa;
          font-size: 13px;
          margin-bottom: 10px;
        }

        .desc {
          font-size: 13px;
          color: #ccc;
          line-height: 1.6;
          margin-bottom: 12px;
        }

        .achievements span {
          display: block;
          font-size: 12px;
          color: #bbb;
          margin-bottom: 4px;
        }
      `}</style>
    </section>
  );
}

const styles = {
  section: {
    padding: "80px 0",
    background: "#141414",
    color: "#fff",
  },
  title: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "36px",
    letterSpacing: "2px",
    marginBottom: "50px",
    paddingLeft: "4%",
  },
};