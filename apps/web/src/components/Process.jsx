import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PROCESS_IMG } from "../lib/images.js";

const STEPS = [
  { no: "01", title: "Brand discovery", desc: "We map your audience, price point and positioning before anything gets formulated." },
  { no: "02", title: "Product development", desc: "Formulations built around your hero SKU, with sourcing and cost per unit locked in." },
  { no: "03", title: "Design & packaging", desc: "Logo, label, box and mockups approved as one system — not one file at a time." },
  { no: "04", title: "Manufacturing", desc: "Production runs to international quality standards, at your batch size and schedule." },
  { no: "05", title: "Testing & certifications", desc: "Batch laboratory reports, quality documentation and certification support on file." },
  { no: "06", title: "Website & marketplace launch", desc: "Your store, payment gateway, Amazon and Flipkart listings all go live together." },
  { no: "07", title: "Marketing & sales", desc: "SEO, social, performance and offline channels start feeding the same funnel." },
  { no: "08", title: "Scale your brand", desc: "Retention, exports and mentorship carry the brand past its first good year." },
];

export default function Process() {
  const ref = useRef(null);
  const railRef = useRef(null);
  // Horizontal distance (px) the rail must travel so the last card fully clears.
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      const rail = railRef.current;
      if (!rail) return;
      setDistance(Math.max(0, rail.scrollWidth - rail.clientWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    // Re-measure once fonts/images have settled and could change widths.
    const t = setTimeout(measure, 400);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Drive the rail 1:1 with the scrolled distance so every card is reachable and
  // the pinned viewport never empties into a dark blank band.
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const barScale = useTransform(scrollYProgress, [0, 1], [0.06, 1]);

  return (
    // Section is exactly one viewport plus the horizontal travel — no dead scroll.
    <section
      className="pin"
      id="process"
      ref={ref}
      style={{ height: `calc(100svh + ${distance}px)` }}
    >
      <div className="pin__sticky">
        <div className="pin__head">
          <p className="eyebrow eyebrow--lime">How it runs</p>
          <h2 className="h2">Eight stages, one timeline.</h2>
          <p className="lead">
            The order matters — each stage unlocks the next. Months of scattered vendor work
            compresses into a single, choreographed launch.
          </p>
        </div>

        <motion.div className="pin__rail" ref={railRef} style={{ x }}>
          {STEPS.map((s, i) => (
            <motion.article
              className="pcard"
              key={s.no}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <div className="pcard__media">
                <span className="pcard__no">{s.no}</span>
                <img src={PROCESS_IMG[i]} alt={s.title} loading="lazy" />
              </div>
              <div className="pcard__body">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="pin__progress">
          <div className="pin__bar">
            <motion.span style={{ scaleX: barScale }} />
          </div>
        </div>
      </div>
    </section>
  );
}
