import React from "react";

const HireMe = () => {
  const reasons = [
    {
      icon: "🎨",
      title: "Premium Visual Craftsmanship",
      desc: "Every pixel designed to deliver luxury brand experiences.",
    },
    {
      icon: "⚡",
      title: "Fast Turnarounds",
      desc: "Projects delivered ahead of schedule with top quality.",
    },
    {
      icon: "📈",
      title: "Proven Results",
      desc: "Clients see 3x engagement and higher conversions.",
    },
    {
      icon: "🌍",
      title: "Mumbai Expertise",
      desc: "Deep understanding of Indian + global design trends.",
    },
    {
      icon: "🏆",
      title: "Top Designer",
      desc: "Recognized among top designers worldwide.",
    },
  ];

  const testimonials = [
    {
      quote:
        "Transformed our brand identity completely. Sales doubled!",
      author: "Priya Sharma",
      role: "CEO - TechNova",
    },
    {
      quote:
        "Best designer I’ve worked with. Understood everything instantly.",
      author: "Rahul Mehta",
      role: "Creative Director",
    },
  ];

  return (
    <section style={styles.section}>
      <h2 className="title">WHY HIRE ME?</h2>
      <p className="subtitle">
        Not just design — I build experiences that convert.
      </p>

      {/* UNIQUE GRID */}
      <div className="grid">
        {reasons.map((reason, idx) => (
          <div key={idx} className="glass-card">
            <div className="icon">{reason.icon}</div>
            <h3>{reason.title}</h3>
            <p>{reason.desc}</p>
          </div>
        ))}
      </div>

      {/* FLOATING TESTIMONIAL CARDS */}
      <div className="testimonials">
        {testimonials.map((t, i) => (
          <div key={i} className="float-card">
            <p>"{t.quote}"</p>
            <h4>{t.author}</h4>
            <span>{t.role}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="cta">
        <h3>Let’s create something powerful</h3>
        <button>Start Project</button>
      </div>

      <style>{`
        .title {
          font-size: 38px;
          letter-spacing: 2px;
          margin-bottom: 10px;
        }

        .subtitle {
          color: #aaa;
          margin-bottom: 50px;
        }

        /* GRID STYLE */
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }

        /* GLASS EFFECT CARD */
        .glass-card {
          background: rgba(255,255,255,0.05);
          border-radius: 16px;
          padding: 25px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.08);
          transition: 0.4s;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .glass-card:hover {
          transform: translateY(-10px) scale(1.03);
          border-color: #e50914;
        }

        .glass-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top left, rgba(229,9,20,0.25), transparent);
          opacity: 0;
          transition: 0.4s;
        }

        .glass-card:hover::before {
          opacity: 1;
        }

        .icon {
          font-size: 34px;
          margin-bottom: 10px;
        }

        .glass-card h3 {
          font-size: 16px;
          margin-bottom: 8px;
        }

        .glass-card p {
          font-size: 13px;
          color: #bbb;
        }

        /* FLOATING TESTIMONIALS */
        .testimonials {
          display: flex;
          gap: 20px;
          margin-top: 70px;
          flex-wrap: wrap;
        }

        .float-card {
          background: #181818;
          padding: 20px;
          border-radius: 14px;
          width: 300px;
          transform: rotate(-2deg);
          transition: 0.4s;
          box-shadow: 0 10px 30px rgba(0,0,0,0.6);
        }

        .float-card:nth-child(2) {
          transform: rotate(2deg);
        }

        .float-card:hover {
          transform: rotate(0deg) scale(1.05);
        }

        .float-card p {
          color: #ccc;
          font-style: italic;
          margin-bottom: 12px;
        }

        .float-card h4 {
          margin: 0;
        }

        .float-card span {
          color: #e50914;
          font-size: 12px;
        }

        /* CTA */
        .cta {
          text-align: center;
          margin-top: 80px;
        }

        .cta h3 {
          font-size: 26px;
          margin-bottom: 20px;
        }

        .cta button {
          background: linear-gradient(45deg, #e50914, #ff3d3d);
          border: none;
          padding: 14px 40px;
          border-radius: 30px;
          color: #fff;
          font-weight: bold;
          font-size: 16px;
          cursor: pointer;
          transition: 0.3s;
        }

        .cta button:hover {
          transform: scale(1.08);
          box-shadow: 0 0 20px rgba(229,9,20,0.6);
        }
      `}</style>
    </section>
  );
};

const styles = {
  section: {
    padding: "100px 4%",
    background: "#141414",
    color: "#fff",
    minHeight: "100vh",
  },
};

export default HireMe;