import React from "react";

export default function Navbar({ navigate, scrolled, currentRoute }) {
  const links = [
    { label: "Home", path: "/home" },
    { label: "About", path: "/about" },
    { label: "Experience", path: "/experience" },
    { label: "Education", path: "/education" },
    { label: "Hire Me", path: "/hire" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        height: "68px",
        padding: "0 4%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled
          ? "rgba(20,20,20,0.97)"
          : "linear-gradient(180deg,rgba(0,0,0,0.85) 0%,transparent 100%)",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.04)"
          : "none",
        transition: "all 0.35s ease",
      }}
    >
      {/* LEFT */}
      <div style={{ display: "flex", alignItems: "center", gap: "36px" }}>
        
        {/* LOGO */}
        <span
          onClick={() => navigate("/home")}
          style={{
            fontFamily: "'Bebas Neue'",
            fontSize: "30px",
            letterSpacing: "5px",
            color: "#E50914",
            cursor: "pointer",
            textShadow: "0 0 24px rgba(229,9,20,0.5)",
          }}
        >
          HARSHADA KADAM
        </span>

        {/* LINKS */}
        <div style={{ display: "flex", gap: "22px" }}>
          {links.map(({ label, path }) => {
            const isActive = currentRoute === path;

            return (
              <button
                key={label}
                onClick={() => navigate(path)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: isActive ? "#fff" : "#b3b3b3",
                  letterSpacing: "0.4px",
                  fontFamily: "'Barlow', sans-serif",
                  position: "relative",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#fff")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = isActive
                    ? "#fff"
                    : "#b3b3b3")
                }
              >
                {label}

                {/* UNDERLINE */}
                <span
                  style={{
                    position: "absolute",
                    bottom: "-4px",
                    left: 0,
                    width: isActive ? "100%" : "0%",
                    height: "2px",
                    background: "#E50914",
                    transition: "width 0.3s ease",
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT */}
      <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
        
        {/* SEARCH */}
        <span
          style={{ color: "#b3b3b3", cursor: "pointer" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#b3b3b3")}
        >
          🔍
        </span>

        {/* NOTIFICATION */}
        <span
          style={{ color: "#b3b3b3", cursor: "pointer" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#b3b3b3")}
        >
          🔔
        </span>

        {/* PROFILE */}
        <div
          onClick={() => navigate("/profiles")}
          style={{
            width: "34px",
            height: "34px",
            background: "linear-gradient(135deg,#E50914,#830a0a)",
            borderRadius: "6px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Bebas Neue'",
            fontSize: "15px",
            color: "#fff",
            boxShadow: "0 0 0 2px rgba(229,9,20,0.3)",
          }}
        >
          HK
        </div>
      </div>
    </nav>
  );
}