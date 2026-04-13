"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Preloader } from "@/components/preloader/preloader";

export function HomeExperience() {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setShowPreloader(false);
    }, 3500);

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <main style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <AnimatePresence mode="wait">
        {showPreloader ? (
          <Preloader key="preloader" />
        ) : (
          <motion.section
            key="hero-shell"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={heroShellStyle}
          >
            <div style={heroGridStyle}>
              <p style={eyebrowStyle}>Portfolio System</p>
              <h1 style={titleStyle}>ARNAV PANIYA</h1>
              <p style={copyStyle}>
                Phase 1 bootstraps the monorepo. Phase 2 delivers the cinematic
                system boot sequence that hands off into the homepage.
              </p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}

const heroShellStyle: React.CSSProperties = {
  minHeight: "100vh",
  display: "grid",
  placeItems: "center",
  padding: "48px 24px",
};

const heroGridStyle: React.CSSProperties = {
  width: "min(780px, 100%)",
  padding: "40px",
  border: "1px solid rgba(37, 99, 235, 0.22)",
  background: "rgba(7, 10, 18, 0.72)",
  backdropFilter: "blur(18px)",
  boxShadow: "0 0 40px rgba(37, 99, 235, 0.14)",
};

const eyebrowStyle: React.CSSProperties = {
  margin: 0,
  color: "#7ea8ff",
  letterSpacing: "0.36em",
  textTransform: "uppercase",
  fontSize: "0.78rem",
  fontFamily: "var(--font-display)",
};

const titleStyle: React.CSSProperties = {
  margin: "18px 0 12px",
  fontSize: "clamp(3rem, 11vw, 5.5rem)",
  lineHeight: 0.94,
  letterSpacing: "0.08em",
  fontFamily: "var(--font-display)",
};

const copyStyle: React.CSSProperties = {
  margin: 0,
  maxWidth: "56ch",
  color: "#acb5ca",
  fontSize: "1rem",
  lineHeight: 1.7,
};
