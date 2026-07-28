import { useMemo } from "react";
import { motion } from "framer-motion";

/**
 * One-time, non-blocking dandelion-seed dispersal. Renders soft seeds that
 * drift outward from the center, twinkle, and fade — ~1.6s total, plays once
 * on mount. pointer-events-none so it never blocks interaction.
 */
function DandelionSeed({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* tuft */}
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <line
            key={i}
            x1="10"
            y1="10"
            x2={10 + Math.cos(a) * 8}
            y2={10 + Math.sin(a) * 8}
            stroke="currentColor"
            strokeWidth="0.6"
            strokeLinecap="round"
            opacity="0.7"
          />
        );
      })}
      <line x1="10" y1="10" x2="10" y2="19" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" opacity="0.5" />
      <circle cx="10" cy="10" r="1.4" fill="currentColor" />
    </svg>
  );
}

export default function DandelionBurst({ count = 18 }) {
  const seeds = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const dist = 800 + Math.random() * 1200;
        return {
          id: i,
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          delay: Math.random() * 0.25,
          scale: 0.7 + Math.random() * 0.5,
          spin: (Math.random() - 0.5) * 120,
          drift: (Math.random() - 0.5) * 30,
          dur: 1.4 + Math.random() * 0.3,
        };
      }),
    [count]
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-visible">
      {seeds.map((s) => (
        <motion.span
          key={s.id}
          className="absolute left-1/2 top-1/2 text-white"
          style={{ marginLeft: -7, marginTop: -7 }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0.3, rotate: 0 }}
          animate={{
            x: [0, s.x * 0.5 + s.drift, s.x],
            y: [0, s.y * 0.5, s.y],
            opacity: [0, 1, 0],
            scale: [0.3, s.scale, s.scale * 0.7],
            rotate: [0, s.spin],
          }}
          transition={{
            duration: s.dur,
            delay: s.delay,
            ease: "easeOut",
            opacity: { duration: s.dur },
            times: [0, 0.45, 1],
          }}
        >
          <DandelionSeed size={70 * s.scale} />
        </motion.span>
      ))}
    </div>
  );
}