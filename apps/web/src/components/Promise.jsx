import { motion } from "framer-motion";
import { fadeUp, stagger, viewportOnce } from "../lib/motion.js";
import Reveal from "./Reveal.jsx";
import { ArrowRight } from "./icons.jsx";

const LINES = [
  { n: "01", pre: "We build ", em: "brands." },
  { n: "02", pre: "We build ", em: "businesses." },
  { n: "03", pre: "We build ", em: "dreams." },
];

export default function Promise() {
  return (
    <section className="sec bg-dark promise">
      <div className="promise__glow" />
      <div className="wrap" style={{ position: "relative", textAlign: "center" }}>
        <Reveal>
          <p className="eyebrow eyebrow--center eyebrow--lime">Our promise</p>
          <h2 className="h2">Your dream. Our expertise. One powerful partnership.</h2>
          <p className="promise__lede">
            Whether you&apos;re launching your first supplement or expanding an established
            business, Fitamins provides everything required to build a trusted, compliant and
            profitable nutrition brand.
          </p>
        </Reveal>

        <motion.div
          className="build-lines"
          variants={stagger(0.14)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {LINES.map((l) => (
            <motion.div className="bline" key={l.n} variants={fadeUp}>
              <b>{l.n}</b>
              <p>
                {l.pre}
                <em>{l.em}</em>
              </p>
            </motion.div>
          ))}
        </motion.div>

        <Reveal className="btn-row" delay={0.1} style={{ justifyContent: "center", marginTop: 48 }}>
          <a href="#contact" className="btn btn--lime">
            Book free consultation <ArrowRight />
          </a>
          <a href="#manifest" className="btn btn--glass">
            Review the manifest
          </a>
        </Reveal>
      </div>
    </section>
  );
}
