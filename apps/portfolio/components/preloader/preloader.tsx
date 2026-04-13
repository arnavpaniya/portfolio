"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Howl } from "howler";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const BOOT_LINES = [
  "INITIALIZING SYSTEM...",
  "LOADING ASSETS...",
  "CALIBRATING ENVIRONMENT...",
  "READY.",
] as const;

export function Preloader() {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let hum: Howl | null = null;
    let cancelled = false;

    void fetch("/sounds/interface/computerNoise_001.ogg", { method: "HEAD" })
      .then((response) => {
        if (!response.ok || cancelled) {
          return;
        }

        hum = new Howl({
          src: ["/sounds/interface/computerNoise_001.ogg"],
          loop: true,
          volume: 0.18,
          autoplay: true,
        });
      })
      .catch(() => {
        // Audio is optional until the asset exists in public/sounds/interface.
      });

    const exitTimer = window.setTimeout(() => {
      setIsExiting(true);
      hum?.fade(hum.volume(), 0, 700);
    }, 2800);

    return () => {
      cancelled = true;
      window.clearTimeout(exitTimer);
      hum?.stop();
      hum?.unload();
    };
  }, []);

  return (
    <motion.section
      initial={{ opacity: 1, scale: 1 }}
      animate={isExiting ? { opacity: 0, scale: 20 } : { opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      style={shellStyle}
    >
      <div style={noiseStyle} />
      <div style={canvasWrapStyle}>
        <Canvas camera={{ position: [0, 0, 6], fov: 48 }}>
          <color attach="background" args={["#050505"]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[3, 3, 5]} intensity={16} color="#2563eb" />
          <pointLight position={[-3, -2, 2]} intensity={8} color="#7c3aed" />
          <ParticleBurst />
          <ToroidalHalo />
        </Canvas>
      </div>

      <div style={contentStyle}>
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={logoWrapStyle}
        >
          <Image
            src="/images/icon.png"
            alt="AP icon"
            width={220}
            height={220}
            priority
            style={logoImageStyle}
          />
        </motion.div>

        <div style={lineStackStyle}>
          {BOOT_LINES.map((line, index) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + index * 0.4, duration: 0.4 }}
              style={lineStyle}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function ParticleBurst() {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const data = new Float32Array(2000 * 3);

    for (let i = 0; i < 2000; i += 1) {
      const i3 = i * 3;
      const radius = Math.pow(Math.random(), 0.3) * 3.25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      data[i3] = radius * Math.sin(phi) * Math.cos(theta);
      data[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      data[i3 + 2] = radius * Math.cos(phi) * 0.32;
    }

    return data;
  }, []);

  useFrame((_, delta) => {
    const points = pointsRef.current;

    if (!points) {
      return;
    }

    points.rotation.z += delta * 0.04;
    points.rotation.y -= delta * 0.06;
    points.scale.x = 1 + Math.sin(performance.now() * 0.0012) * 0.02;
    points.scale.y = points.scale.x;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#f8fbff"
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.95}
      />
    </points>
  );
}

function ToroidalHalo() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const mesh = meshRef.current;

    if (!mesh) {
      return;
    }

    mesh.rotation.x += delta * 0.28;
    mesh.rotation.y += delta * 0.62;
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[1.45, 0.045, 24, 160]} />
      <meshStandardMaterial
        color="#60a5fa"
        emissive="#2563eb"
        emissiveIntensity={3.5}
        toneMapped={false}
      />
    </mesh>
  );
}

const shellStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  display: "grid",
  placeItems: "center",
  background: "#050505",
  zIndex: 30,
  overflow: "hidden",
};

const noiseStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
  backgroundSize: "80px 80px",
  maskImage: "radial-gradient(circle at center, black 20%, transparent 82%)",
  opacity: 0.24,
};

const canvasWrapStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
};

const contentStyle: React.CSSProperties = {
  position: "relative",
  display: "grid",
  justifyItems: "center",
  gap: "24px",
  padding: "24px",
};

const logoWrapStyle: React.CSSProperties = {
  width: "min(42vw, 220px)",
  aspectRatio: "1 / 1",
  display: "grid",
  placeItems: "center",
  borderRadius: "50%",
  border: "1px solid rgba(96, 165, 250, 0.35)",
  background: "radial-gradient(circle, rgba(37, 99, 235, 0.18), rgba(5, 5, 5, 0.1) 58%, transparent 74%)",
  boxShadow: "0 0 40px rgba(37, 99, 235, 0.18)",
};

const logoStyle: React.CSSProperties = {
  fontSize: "clamp(3rem, 9vw, 5.5rem)",
  lineHeight: 1,
  letterSpacing: "0.22em",
  textIndent: "0.22em",
  color: "#f8fbff",
  textShadow: "0 0 18px rgba(96, 165, 250, 0.45)",
};

const logoImageStyle: React.CSSProperties = {
  width: "78%",
  height: "78%",
  objectFit: "contain",
  filter: "drop-shadow(0 0 28px rgba(96, 165, 250, 0.42))",
};

const lineStackStyle: React.CSSProperties = {
  display: "grid",
  gap: "8px",
  justifyItems: "center",
  textAlign: "center",
};

const lineStyle: React.CSSProperties = {
  margin: 0,
  color: "#60a5fa",
  fontSize: "clamp(0.76rem, 1.8vw, 1rem)",
  letterSpacing: "0.34em",
  textIndent: "0.34em",
  fontFamily: "var(--font-display)",
};
