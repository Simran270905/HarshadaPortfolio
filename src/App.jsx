import React, { useEffect, useState } from "react";
import useRouter from "./hooks/useRouter";

import Navbar from "./components/Navbar";
import Btn from "./components/Btn";

import IntroScreen from "./pages/IntroScreen";
import ProfilesScreen from "./pages/ProfilesScreen";
import HomePage from "./pages/HomePage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import AboutSection from "./pages/About";

// ✅ NEW IMPORTS
import ExperienceSection from "./pages/Experience";
import EducationSection from "./pages/Education";
import HireMe from "./pages/HireMe";

export default function App() {
  const { route, navigate } = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // ✅ Routes
  const isIntro = route === "/";
  const isProfiles = route === "/profiles";
  const isHome = route === "/home";
  const isAbout = route === "/about";

  // 🔥 NEW ROUTES
  const isExperience = route === "/experience";
  const isEducation = route === "/education";
  const isHire = route === "/hire";

  const projectMatch = route.match(/^\/project\/(.+)$/);
  const projectId = projectMatch?.[1];

  // ✅ Navbar visibility
  const showNav =
    isHome || isAbout || isExperience || isEducation || isHire || !!projectId;

  return (
    <>
      {/* 🔥 Navbar */}
      {showNav && (
        <Navbar
          navigate={navigate}
          scrolled={scrolled}
          currentRoute={route}
        />
      )}

      {/* 🔥 Pages */}
      {isIntro && <IntroScreen navigate={navigate} />}
      {isProfiles && <ProfilesScreen navigate={navigate} />}
      {isHome && <HomePage navigate={navigate} scrolled={scrolled} />}
      {isAbout && <AboutSection />}

      {/* 🔥 NEW PAGES */}
      {isExperience && <ExperienceSection />}
      {isEducation && <EducationSection />}
      {isHire && <HireMe />}

      {projectId && (
        <ProjectDetailPage
          projectId={projectId}
          navigate={navigate}
        />
      )}

      {/* ❌ 404 */}
      {!isIntro &&
        !isProfiles &&
        !isHome &&
        !isAbout &&
        !isExperience &&
        !isEducation &&
        !isHire &&
        !projectId && (
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "#141414",
              color: "#fff",
            }}
          >
            <h1
              style={{
                fontSize: "72px",
                color: "#E50914",
                marginBottom: "20px",
              }}
            >
              404
            </h1>

            <Btn variant="red" onClick={() => navigate("/home")}>
              ← Back to Home
            </Btn>
          </div>
        )}
    </>
  );
}