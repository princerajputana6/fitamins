import { motion } from "framer-motion";
import Reveal from "./Reveal.jsx";
import LeadForm from "./LeadForm.jsx";
import { IMG } from "../lib/images.js";

export default function Intro() {
  return (
    <section className="sec bg-cream" id="about">
      <div className="wrap split split--form">
        {/* Left: nutrition image + badge. */}
        <motion.div
          className="split__media"
          initial={{ opacity: 0, clipPath: "inset(12% 12% 12% 12% round 32px)" }}
          whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 32px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <img src={IMG.smoothie} alt="Nutrition and wellness" loading="lazy" />
          <div className="split__badge">
            <b>1</b>
            <span>
              One partner, one timeline — instead of five vendors and the gaps between them.
            </span>
          </div>
        </motion.div>

        {/* Right: about copy + consultation form. */}
        <div className="split__content" id="contact">
          <Reveal>
            <p className="eyebrow">Who we are</p>
            <h2 className="split__big">
              We don&apos;t just manufacture supplements.{" "}
              <span>We build brands that last.</span>
            </h2>
          </Reveal>
          <Reveal className="split__body" delay={0.08}>
            <p>
              At <strong>Fitamins Healthcare Pvt. Ltd.</strong>, we help entrepreneurs turn a
              vision into a working nutrition brand. Formulation and manufacturing are the
              starting point — not the finish line.
            </p>
            <p>
              Branding, marketing, compliance and growth all sit with the same team, so
              nothing gets handed off, duplicated or dropped between vendors. We stay your
              partner at every stage of the journey.
            </p>
          </Reveal>

          <LeadForm idPrefix="intro" delay={0.16} />
        </div>
      </div>
    </section>
  );
}
