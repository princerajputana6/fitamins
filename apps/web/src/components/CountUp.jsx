import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { EASE } from "../lib/motion.js";

/**
 * Animated number that counts up from 0 → target the first time it scrolls into view.
 * `pad` zero-pads the result (e.g. pad=2 → "08"); `duration` in seconds.
 */
export default function CountUp({ target, pad = 0, duration = 1.4, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const text = useTransform(count, (v) => {
    const n = Math.round(v);
    return pad ? String(n).padStart(pad, "0") : String(n);
  });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, target, { duration, ease: EASE });
    return controls.stop;
  }, [inView, target, duration, count]);

  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  );
}
