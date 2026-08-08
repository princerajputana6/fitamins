import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "../lib/motion.js";
import { IMG } from "../lib/images.js";
import Reveal from "./Reveal.jsx";
import Img from "./Img.jsx";
import { CheckThin } from "./icons.jsx";

const SLIDES = [
  {
    img: IMG.mentor,
    tag: "Brand & business growth",
    quote: ["We price the product for the ", "margin you actually keep", " — not the label on the shelf."],
    name: "Kuldeep Singh Yadav",
    role: "Lead mentor",
  },
  {
    img: IMG.team,
    tag: "Go-to-market",
    quote: ["Your first hundred customers decide the next ", "ten thousand", ". We build for both."],
    name: "Fitamins Growth Team",
    role: "Marketing & sales",
  },
  {
    img: IMG.fitWoman,
    tag: "Scale & retention",
    quote: ["A supplement brand lives on ", "repeat orders", " — retention is the real growth engine."],
    name: "Fitamins Strategy Desk",
    role: "Long-term development",
  },
];

const POINTS = [
  "Brand management training",
  "Business growth strategy",
  "Marketing roadmap",
  "Sales scaling framework",
  "Long-term brand development",
];

export default function Mentorship() {
  const [i, setI] = useState(0);
  const active = SLIDES[i];

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 5200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="sec bg-paper" id="mentorship">
      <div className="wrap mentor">
        <div className="mentor__media">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={i}
              style={{ position: "absolute", inset: 0 }}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <Img src={active.img} alt={active.name} />
            </motion.div>
          </AnimatePresence>
          <span className="mentor__tag">{active.tag}</span>
        </div>

        <div className="mentor__body">
          <Reveal>
            <p className="eyebrow">Grow with people who&apos;ve run this business</p>
          </Reveal>

          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              className="quote"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              “{active.quote[0]}
              <span>{active.quote[1]}</span>
              {active.quote[2]}”
            </motion.blockquote>
          </AnimatePresence>

          <div className="mentor__by">
            <div>
              <b>{active.name}</b>
              <em>{active.role}</em>
            </div>
          </div>

          <div className="mentor__dots">
            {SLIDES.map((_, d) => (
              <button
                key={d}
                className={`dot-btn${d === i ? " is-active" : ""}`}
                onClick={() => setI(d)}
                aria-label={`Slide ${d + 1}`}
              />
            ))}
          </div>

          <div className="mchips" style={{ marginTop: 34 }}>
            {POINTS.map((p) => (
              <div className="mchip" key={p}>
                <CheckThin /> {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
