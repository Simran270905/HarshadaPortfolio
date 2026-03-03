import React from "react";

const education = [
  {
    degree: "Bachelor of Management Studies",
    school: "KB Girls College",
    years: "2019-2023",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
  },
  {
    degree: "Advanced UI/UX Diploma",
    school: "Arena Animation",
    years: "2023",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a",
  },
  {
    degree: "Business Analytics",
    school: "Online Certification",
    years: "2024",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },
];

export default function EducationSection() {
  return (
    <section style={styles.section}>
      <h2 style={styles.title}>Education</h2>

      <div style={styles.row}>
        {education.map((edu, idx) => (
          <div key={idx} className="card">
            <img src={edu.image} alt={edu.degree} />

            <div className="gradient"></div>

            <div className="info">
              <h3>{edu.degree}</h3>
              <p className="school">{edu.school}</p>
              <p className="year">{edu.years}</p>

              <div className="buttons">
                <button className="play">▶</button>
                <button className="icon">＋</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .card {
          position: relative;
          width: 100%;
          height: 360px;
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.4s ease, z-index 0.3s;
          cursor: pointer;
        }

        .card:hover {
          transform: scale(1.08);
          z-index: 10;
        }

        .card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0.6), transparent);
          opacity: 0;
          transition: 0.3s;
        }

        .card:hover .gradient {
          opacity: 1;
        }

        .info {
          position: absolute;
          bottom: 0;
          padding: 16px;
          opacity: 0;
          transform: translateY(20px);
          transition: 0.3s;
        }

        .card:hover .info {
          opacity: 1;
          transform: translateY(0);
        }

        .school {
          color: #e50914;
          font-size: 13px;
        }

        .year {
          color: #bbb;
          font-size: 12px;
        }

        .buttons {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }

        .play, .icon {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }

        .play {
          background: #fff;
          color: #000;
        }

        .icon {
          background: transparent;
          border: 1px solid #fff;
          color: #fff;
        }
      `}</style>
    </section>
  );
}

const styles = {
  section: {
    padding: "60px 4%",
    background: "#141414",
    color: "#fff",
    minHeight: "100vh",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "20px",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "20px",
    width: "100%",
  },
};