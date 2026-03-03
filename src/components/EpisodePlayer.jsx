import React, { useRef, useState, useEffect } from "react";
import ImageGallery from "./ImageGallery";

export default function EpisodePlayer({ episode }) {
  const videoRef = useRef(null);
  const bgVideoRef = useRef(null);
  const containerRef = useRef(null);
  const controlTimer = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(true);
  const [showControls, setShowControls] = useState(true);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    return () => clearTimeout(controlTimer.current);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!episode) return null;

  const syncVideos = () => {
    if (!videoRef.current || !bgVideoRef.current) return;
    bgVideoRef.current.currentTime = videoRef.current.currentTime;
  };

  const togglePlay = () => {
    if (!videoRef.current || !bgVideoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      bgVideoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      bgVideoRef.current.pause();
      setPlaying(false);
    }

    resetControlTimer();
  };

  const resetControlTimer = () => {
    setShowControls(true);
    clearTimeout(controlTimer.current);

    controlTimer.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const onTimeUpdate = () => {
    if (!videoRef.current || !videoRef.current.duration) return;

    const { currentTime, duration } = videoRef.current;
    setProgress((currentTime / duration) * 100);

    syncVideos();
  };

  const seek = (e) => {
    e.stopPropagation();

    if (!videoRef.current || !videoRef.current.duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    let pct = (e.clientX - rect.left) / rect.width;
    pct = Math.max(0, Math.min(1, pct));

    const newTime = pct * videoRef.current.duration;
    videoRef.current.currentTime = newTime;

    if (bgVideoRef.current) {
      bgVideoRef.current.currentTime = newTime;
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  if (episode.video) {
    return (
      <div
        ref={containerRef}
        onMouseMove={resetControlTimer}
        style={{
          position: "relative",
          borderRadius: isMobile ? "4px" : "8px",
          overflow: "hidden",
          background: "#000",
          cursor: "pointer",
        }}
      >
        {/* BACKGROUND VIDEO */}
        <video
          ref={bgVideoRef}
          src={episode.video}
          muted
          loop
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(40px) brightness(0.4)",
            transform: "scale(1.2)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        {/* MAIN VIDEO */}
        <video
          ref={videoRef}
          src={episode.video}
          muted={muted}
          loop
          onTimeUpdate={onTimeUpdate}
          onClick={togglePlay}
          onLoadedMetadata={() => setProgress(0)}
          style={{
            width: "100%",
            display: "block",
            aspectRatio: "16/9",
            objectFit: "contain",
            position: "relative",
            zIndex: 1,
            maxHeight: isMobile ? "50vh" : "none",
          }}
        />

        {/* CONTROLS */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            padding: isMobile ? "10px 12px" : "14px 18px",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.4), transparent)",
            opacity: showControls ? 1 : 0,
            transition: "opacity 0.3s ease",
            zIndex: 2,
          }}
        >
          <div
            onClick={seek}
            style={{
              height: "5px",
              background: "rgba(255,255,255,0.2)",
              borderRadius: "4px",
              marginBottom: "12px",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "#E50914",
                borderRadius: "4px",
              }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={(e) => {e.stopPropagation(); togglePlay();}} style={btn}>
                {playing ? "⏸" : "▶"}
              </button>

              <button onClick={(e) => {e.stopPropagation(); toggleMute();}} style={btn}>
                {muted ? "🔇" : "🔊"}
              </button>
            </div>

            <button onClick={(e) => {e.stopPropagation(); toggleFullscreen();}} style={btn}>
              ⛶
            </button>
          </div>
        </div>

        {/* CENTER PLAY */}
        {!playing && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              zIndex: 2,
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              style={{
                width: isMobile ? "50px" : "70px",
                height: isMobile ? "50px" : "70px",
                borderRadius: "50%",
                background: "#E50914",
                color: "#fff",
                fontSize: isMobile ? "22px" : "28px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 0 20px rgba(229,9,20,0.6)",
              }}
            >
              ▶
            </button>
          </div>
        )}
      </div>
    );
  }

  return <ImageGallery images={episode.images} />;
}

const btn = {
  background: "rgba(255,255,255,0.1)",
  border: "none",
  borderRadius: "50%",
  width: "36px",
  height: "36px",
  color: "#fff",
  cursor: "pointer",
  fontSize: "16px",
};