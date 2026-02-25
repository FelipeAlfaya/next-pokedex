"use client";

import dynamic from "next/dynamic";

const Antigravity = dynamic(() => import("@/components/Antigravity"), { ssr: false });

export default function AntigravityBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 w-full h-full opacity-60">
        <Antigravity
          count={300}
          magnetRadius={6}
          ringRadius={7}
          waveSpeed={0.4}
          waveAmplitude={1}
          particleSize={1.5}
          lerpSpeed={0.05}
          color="#ff2929"
          autoAnimate
          particleVariance={1}
          rotationSpeed={0}
          depthFactor={1}
          pulseSpeed={3}
          particleShape="capsule"
          fieldStrength={10}
        />
      </div>
      <div className="absolute inset-0 bg-dex-dark/70 pointer-events-none" />
    </div>
  );
}
