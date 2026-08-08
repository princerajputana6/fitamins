import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

let counter = 0;

/**
 * Image with:
 *  - a graceful picsum fallback if the source fails to load,
 *  - optional scroll-linked parallax (`parallax` = px of travel),
 *  - a subtle load-in fade.
 */
export default function Img({
  src,
  alt = "",
  className,
  parallax = 0,
  fallbackSeed,
  ...rest
}) {
  const ref = useRef(null);
  const [seed] = useState(() => fallbackSeed || `fit-${counter++}`);
  const [loaded, setLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    parallax ? [parallax, -parallax] : [0, 0]
  );

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden", position: "relative" }}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          width: "100%",
          height: parallax ? `calc(100% + ${parallax * 2}px)` : "100%",
          objectFit: "cover",
          display: "block",
          y,
          scale: parallax ? 1.06 : 1,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          if (!e.currentTarget.dataset.fb) {
            e.currentTarget.dataset.fb = "1";
            e.currentTarget.src = `https://picsum.photos/seed/${seed}/1000/1250`;
          }
        }}
        {...rest}
      />
    </div>
  );
}
