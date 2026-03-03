// src/components/ImageGallery.jsx
import React, { useState, useEffect } from "react";

export default function ImageGallery({ images = [] }) {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const prev = () => {
    setLoaded(false);
    setCurrent((c) => (c - 1 + images.length) % images.length);
  };

  const next = () => {
    setLoaded(false);
    setCurrent((c) => (c + 1) % images.length);
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setFullscreen(false);
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [images.length]);

  if (!images.length) return null;

  return (
    <>
      <div
        style={{
          position: "relative",
          borderRadius: "8px",
          overflow: "hidden",
          background: "#0a0a0a",
        }}
      >
        {/* MAIN IMAGE */}
        <div style={{ position: "relative", aspectRatio: "16/9" }}>
          {!loaded && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg,#111 25%,#222 50%,#111 75%)",
                backgroundSize: "800px 100%",
                animation: "shimmer 1.5s infinite",
              }}
            />
          )}

          <img
            key={current}
            src={images[current]}
            alt=""
            onLoad={() => setLoaded(true)}
            onClick={() => setFullscreen(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              cursor: "zoom-in",
              display: "block",
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          />

          

          {/* COUNTER */}
          <div
            style={{
              position: "absolute",
              bottom: "12px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(0,0,0,0.65)",
              borderRadius: "20px",
              padding: "5px 14px",
              fontSize: "12px",
              color: "#ccc",
            }}
          >
            {current + 1} / {images.length}
          </div>

          {/* NAV BUTTONS */}
          <button
            onClick={prev}
            style={{
              position: "absolute",
              top: "50%",
              left: "12px",
              transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.65)",
              border: "none",
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              color: "#fff",
              fontSize: "22px",
              cursor: "pointer",
            }}
          >
            ‹
          </button>

          <button
            onClick={next}
            style={{
              position: "absolute",
              top: "50%",
              right: "12px",
              transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.65)",
              border: "none",
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              color: "#fff",
              fontSize: "22px",
              cursor: "pointer",
            }}
          >
            ›
          </button>
        </div>

        {/* THUMBNAILS */}
        <div
          style={{
            display: "flex",
            gap: "6px",
            padding: "10px 12px",
            overflowX: "auto",
            background: "#111",
          }}
        >
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              onClick={() => {
                setLoaded(false);
                setCurrent(i);
              }}
              style={{
                width: "72px",
                height: "46px",
                objectFit: "cover",
                borderRadius: "3px",
                cursor: "pointer",
                flexShrink: 0,
                border:
                  i === current
                    ? "2px solid #E50914"
                    : "2px solid transparent",
                opacity: i === current ? 1 : 0.55,
              }}
            />
          ))}
        </div>
      </div>

      {/* FULLSCREEN VIEW */}
      {fullscreen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={images[current]}
            alt=""
            style={{
              maxWidth: "95vw",
              maxHeight: "95vh",
              objectFit: "contain",
            }}
          />

          {/* CLOSE */}
          <button
            onClick={() => setFullscreen(false)}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: "none",
              color: "#fff",
              fontSize: "18px",
              cursor: "pointer",
              background: "rgba(255,255,255,0.1)",
            }}
          >
            ✕
          </button>

          {/* LEFT */}
          <button
            onClick={prev}
            style={{
              position: "absolute",
              left: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              border: "none",
              background: "rgba(0,0,0,0.6)",
              color: "#fff",
              fontSize: "26px",
              cursor: "pointer",
            }}
          >
            ‹
          </button>

          {/* RIGHT */}
          <button
            onClick={next}
            style={{
              position: "absolute",
              right: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              border: "none",
              background: "rgba(0,0,0,0.6)",
              color: "#fff",
              fontSize: "26px",
              cursor: "pointer",
            }}
          >
            ›
          </button>

          {/* COUNTER */}
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(0,0,0,0.7)",
              padding: "6px 16px",
              borderRadius: "20px",
              fontSize: "13px",
              color: "#ccc",
            }}
          >
            {current + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}