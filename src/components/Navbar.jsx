import React, { useState, useEffect } from "react";

export default function Navbar({ navigate, scrolled, currentRoute }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
      if (window.innerWidth >= 900) setMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {/* 🍔 MOBILE MENU */}
        {isMobile && (
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              fontSize: "22px",
              cursor: "pointer",
              color: "#fff",
            }}
          >
            ☰
          </div>
        )}

        {/* LOGO */}
        <span
          onClick={() => navigate("/home")}
          style={{
            fontFamily: "'Bebas Neue'",
            fontSize: isMobile ? "22px" : "30px",
            letterSpacing: "5px",
            color: "#E50914",
            cursor: "pointer",
            textShadow: "0 0 24px rgba(229,9,20,0.5)",
          }}
        >
          HARSHADA KADAM
        </span>

        {/* LINKS (DESKTOP ONLY) */}
        {!isMobile && (
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
                  }}
                >
                  {label}

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
        )}
      </div>

      {/* RIGHT */}
      <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
        <span style={{ color: "#b3b3b3", cursor: "pointer" }}>🔍</span>
        <span style={{ color: "#b3b3b3", cursor: "pointer" }}>🔔</span>

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
          }}
        >
          HK
        </div>
      </div>

      {/* 📱 MOBILE DROPDOWN MENU */}
      {isMobile && menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "68px",
            left: 0,
            width: "100%",
            background: "rgba(20,20,20,0.98)",
            backdropFilter: "blur(10px)",
            padding: "20px 4%",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          {links.map(({ label, path }) => {
            const isActive = currentRoute === path;

            return (
              <button
                key={label}
                onClick={() => {
                  navigate(path);
                  setMenuOpen(false);
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: isActive ? "#fff" : "#b3b3b3",
                  fontSize: "16px",
                  textAlign: "left",
                  cursor: "pointer",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}