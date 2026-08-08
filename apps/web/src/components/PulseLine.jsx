import { motion } from "framer-motion";
import { EASE } from "../lib/motion.js";

/**
 * A slim animated EKG / heartbeat line — a subtle "fitness" motif.
 * The trace draws itself in on view (Framer), then a glowing dot runs the beat
 * on a loop (SMIL animateMotion, well supported and cheap).
 */
export default function PulseLine({ className = "", color = "var(--lime)" }) {
  const d =
    "M0 30 H120 l14 -22 l16 44 l14 -34 l12 22 H360 l14 -22 l16 44 l14 -34 l12 22 H720";
  return (
    <svg
      className={`pulseline ${className}`}
      viewBox="0 0 720 60"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path
        d={d}
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.6, ease: EASE }}
      />
      <circle r="4.5" fill={color} style={{ filter: "drop-shadow(0 0 6px var(--lime))" }}>
        <animateMotion dur="2.4s" repeatCount="indefinite" path={d} />
        <animate
          attributeName="opacity"
          values="0;1;1;0"
          keyTimes="0;0.1;0.85;1"
          dur="2.4s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}
