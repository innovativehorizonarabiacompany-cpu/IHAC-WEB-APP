'use client'

import { useCallback } from "react"
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"

export default function ParticleBackground({ className = "" }) {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine)
  }, [])

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} style={{ zIndex: 1 }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 pointer-events-none"
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          pauseOnBlur: true,
          pauseOnOutsideViewport: true,
          motion: { disable: "reduce" },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "grab" },
              resize: true,
            },
            modes: {
              grab: { distance: 180, links: { opacity: 0.2 } },
            },
          },
          particles: {
            color: { value: "#334155" },
            links: {
              color: "#334155",
              distance: 120,
              enable: true,
              opacity: 0.15,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.4,
              outModes: { default: "bounce" },
            },
            number: {
              density: { enable: true, area: 800 },
              value: 50,
            },
            opacity: {
              value: 0.35,
              animation: { enable: false },
            },
            shape: { type: "circle" },
            size: {
              value: { min: 1.5, max: 5 },
              animation: { enable: false },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  )
}
