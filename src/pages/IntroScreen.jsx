// src/pages/IntroScreen.jsx
import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import Btn from "../components/Btn";

export default function IntroScreen({ navigate }) {
  const controls = useAnimationControls();
  const audioRef = useRef(null);
  const [started, setStarted] = useState(false);
  const timeouts = useRef([]);

  const handleEnter = async () => {
    if (started) return;
    setStarted(true);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.muted = false;
      try {
        await audioRef.current.play();
      } catch (err) {
        console.log("Audio blocked:", err);
      }
    }

    await controls.start("logoIn");

    const t1 = setTimeout(() => controls.start("pulse"), 600);
    const t2 = setTimeout(() => controls.start("fadeOut"), 2000);
    const t3 = setTimeout(() => navigate("/profiles"), 2800);

    timeouts.current = [t1, t2, t3]; // ✅ FIXED (no push)
  };

  // ✅ FIXED cleanup (no warning now)
  useEffect(() => {
    const currentTimeouts = timeouts.current;
    return () => {
      currentTimeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <motion.div
      onClick={handleEnter}
      initial={{ opacity: 1 }}
      animate={controls}
      variants={{
        fadeOut: { opacity: 0, filter: "blur(10px)" },
      }}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <audio
        ref={audioRef}
        src="/sounds/netflixsound.mp3"
        preload="auto"
      />

      {/* Scanline */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
        }}
      />

      {/* Glow */}
      <motion.div
        style={{
          position: "absolute",
          width: "600px",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(229,9,20,0.2) 0%, transparent 70%)",
        }}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 0.5 }}
        transition={{ duration: 1 }}
      />

      {/* Content */}
      <motion.div
        style={{ textAlign: "center" }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          style={{
            fontFamily: "'Bebas Neue'",
            fontSize: "clamp(72px, 12vw, 140px)",
            letterSpacing: "12px",
            color: "#E50914",
            marginBottom: "8px",
          }}
          initial={{ scale: 0.6, opacity: 0, rotateX: -90 }}
          animate={controls}
          variants={{
            logoIn: {
              scale: [0.6, 1.15, 1],
              opacity: 1,
              rotateX: 0,
              textShadow:
                "0 0 40px rgba(229,9,20,0.7), 0 0 100px rgba(229,9,20,0.3)",
            },
            pulse: {
              scale: [1, 1.25, 0.95, 1.05, 1],
              rotate: [0, -2, 2, 0],
              textShadow: [
                "0 0 20px #E50914",
                "0 0 80px #E50914",
                "0 0 20px #E50914",
              ],
            },
          }}
        >
          NETFLIX
        </motion.h1>

        <p
          style={{
            color: "#808080",
            fontSize: "16px",
            letterSpacing: "6px",
            marginBottom: "60px",
          }}
        >
          HARSHADA KADAM · DESIGNER
        </p>

        {!started && (
          <Btn
            variant="red"
            onClick={(e) => {
              e.stopPropagation();
              handleEnter();
            }}
            style={{ padding: "14px 48px", fontSize: "17px" }}
          >
            ▶ Enter Portfolio
          </Btn>
        )}
      </motion.div>

      {!started && (
        <motion.div
          style={{
            position: "absolute",
            bottom: "40px",
            color: "rgba(255,255,255,0.6)",
            fontSize: "12px",
            letterSpacing: "4px",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          CLICK ANYWHERE TO ENTER
        </motion.div>
      )}
    </motion.div>
  );
}