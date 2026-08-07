import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 380,
    damping: 40,
    restDelta: 0.001,
  });
  return <motion.div className="progress" style={{ scaleX }} aria-hidden="true" />;
}
