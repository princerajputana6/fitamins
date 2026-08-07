import { useRef, useState, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { DIVISIONS } from "@fitamins/shared/deliverables";
import { DIVISION_IMG } from "../lib/images.js";
import { EASE } from "../lib/motion.js";
import Reveal from "./Reveal.jsx";
import { CheckThin, ArrowRight } from "./icons.jsx";

const ChevL = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ChevR = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Capabilities() {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [bounds, setBounds] = useState(0);
  const [step, setStep] = useState(440);

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const first = track.children[0];
      const gap = 22;
      const s = first ? first.offsetWidth + gap : 440;
      setStep(s);
      setBounds(Math.max(0, track.scrollWidth - track.parentElement.offsetWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const maxIndex = Math.max(0, Math.ceil(bounds / step));
  const x = -Math.min(index * step, bounds);

  const go = (dir) => setIndex((i) => Math.min(Math.max(i + dir, 0), maxIndex));

  return (
    <section className="sec bg-cream" id="capabilities">
      <div className="wrap slider">
        <div className="slider__head">
          <Reveal>
            <p className="eyebrow">The build manifest · 8 divisions</p>
            <h2 className="h2">Everything your brand needs — itemised.</h2>
            <p className="lead">
              Drag, or use the arrows. Each card is a division we hand over end to end, not a
              capability we could arrange.
            </p>
          </Reveal>
          <div className="slider__nav">
            <button className="sq-btn" onClick={() => go(-1)} disabled={index === 0} aria-label="Previous">
              <ChevL />
            </button>
            <button className="sq-btn" onClick={() => go(1)} disabled={index >= maxIndex} aria-label="Next">
              <ChevR />
            </button>
          </div>
        </div>

        <div className="track-mask">
          <motion.div
            className="track"
            ref={trackRef}
            drag="x"
            dragConstraints={{ left: -bounds, right: 0 }}
            dragElastic={0.08}
            animate={{ x }}
            transition={{ type: "spring", stiffness: 260, damping: 34 }}
          >
            {DIVISIONS.map((d, i) => (
              <motion.article
                className="slide"
                key={d.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: EASE, delay: (i % 4) * 0.06 }}
              >
                <div className="slide__media">
                  <span className="slide__no">{String(i + 1).padStart(2, "0")}</span>
                  <img src={DIVISION_IMG[d.id]} alt={d.name} draggable="false" />
                  <span className="slide__count">{d.items.length} deliverables</span>
                </div>
                <div className="slide__body">
                  <h3>{d.name}</h3>
                  <ul className="slide__list">
                    {d.items.slice(0, 4).map((it) => (
                      <li key={it}>
                        <CheckThin /> {it}
                      </li>
                    ))}
                  </ul>
                  {d.items.length > 4 && (
                    <p className="slide__more">+ {d.items.length - 4} more in this division</p>
                  )}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>

        <Reveal className="btn-row" delay={0.1} style={{ marginTop: 36 }}>
          <a href="#manifest" className="btn btn--primary">
            View the full itemised list <ArrowRight />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
