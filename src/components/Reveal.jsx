import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "../lib/motion.js";

/**
 * Scroll-reveal wrapper. Fades + rises into view once.
 * `as` lets you keep semantic tags (section, article, h2, …).
 */
export default function Reveal({
  as = "div",
  variants = fadeUp,
  delay = 0,
  className,
  children,
  ...rest
}) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={delay ? { delay } : undefined}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
