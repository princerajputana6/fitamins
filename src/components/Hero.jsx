import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE } from "../lib/motion.js";
import { IMG } from "../lib/images.js";
import { ArrowRight } from "./icons.jsx";
import CountUp from "./CountUp.jsx";

const TITLE = [
  { t: "From", accent: false },
  { t: "idea", accent: false },
  { t: "to", accent: false },
  { t: "industry.", accent: true },
];

const wordV = {
  hidden: { y: "115%" },
  show: (i) => ({
    y: "0%",
    transition: { duration: 0.9, ease: EASE, delay: 0.15 + i * 0.09 },
  }),
};

const upV = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: 0.7 + i * 0.1 },
  }),
};

const STATS = [
  { n: 54, l: "Deliverables" },
  { n: 8, l: "Divisions" },
  { n: 1, l: "Vendor to manage" },
];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section className="hero" ref={ref}>
      <motion.div className="hero__media" style={{ y: imgY, scale: imgScale }}>
        <img src={IMG.heroAthlete} alt="Athlete training" />
      </motion.div>
      <div className="hero__scrim" />

      <motion.div
        className="wrap hero__in"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          className="hero__tag"
          variants={upV}
          initial="hidden"
          animate="show"
        >
          <i className="dot" /> Fitamins Healthcare Pvt. Ltd.
        </motion.p>

        <h1 className="hero__title" aria-label="From idea to industry.">
          {TITLE.map((w, i) => (
            <span
              key={w.t}
              style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
            >
              <motion.span
                className={`hero__word${w.accent ? " accent" : ""}`}
                custom={i}
                variants={wordV}
                initial="hidden"
                animate="show"
              >
                {w.t}
              </motion.span>
              {i < TITLE.length - 1 && " "}
            </span>
          ))}
        </h1>

        <div className="hero__bottom">
          <motion.p
            className="hero__sub"
            variants={upV}
            custom={0}
            initial="hidden"
            animate="show"
          >
            We don&apos;t just manufacture supplements — we build the entire brand around
            them. Formulation, packaging, compliance, storefront, marketplaces and growth,
            all under one roof.
          </motion.p>

          <motion.div
            className="hero__actions"
            variants={upV}
            custom={1}
            initial="hidden"
            animate="show"
          >
            <div className="btn-row">
              <a href="#contact" className="btn btn--lime">
                Start your brand <ArrowRight />
              </a>
              <a href="#capabilities" className="btn btn--glass">
                See what&apos;s included
              </a>
            </div>
            <p className="hero__note">
              Free consultation · No obligation · Reply within one working day
            </p>
          </motion.div>
        </div>

        <motion.div
          className="hero__stats"
          variants={upV}
          custom={2}
          initial="hidden"
          animate="show"
        >
          {STATS.map((s) => (
            <div className="hero__stat" key={s.l}>
              <b>
                <CountUp target={s.n} pad={2} />
              </b>
              <span>{s.l}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        Scroll
        <i />
      </motion.div>
    </section>
  );
}
