import { motion } from "framer-motion";
import { fadeUp, stagger, viewportOnce } from "../lib/motion.js";
import Reveal from "./Reveal.jsx";
import Img from "./Img.jsx";
import { IMG } from "../lib/images.js";

const ICONS = {
  spark: <path d="M11 2 4 11h4.5L9 18l7-9h-4.5L11 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />,
  shield: (
    <>
      <path d="M10 2 3.5 5v5c0 3.9 2.8 6.8 6.5 8 3.7-1.2 6.5-4.1 6.5-8V5L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="m7.4 9.8 1.9 1.9 3.6-3.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  doc: (
    <>
      <rect x="4" y="2.5" width="12" height="15" rx="2.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.4 7h5.2M7.4 10h5.2M7.4 13h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  chart: <path d="M3 15.5V9m4.7 6.5V4.5M12.4 15.5v-8M17 15.5v-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />,
  clock: (
    <>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 5.6v4.6l3 1.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};

function Icon({ d }) {
  return (
    <div className="ficon">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        {d}
      </svg>
    </div>
  );
}

export default function Why() {
  return (
    <section className="sec bg-cream" id="why">
      <div className="wrap">
        <Reveal className="sec-head sec-head--center">
          <p className="eyebrow eyebrow--center">Why founders choose Fitamins</p>
          <h2 className="h2">One team. The whole build. Zero gaps.</h2>
        </Reveal>

        <motion.div
          className="feat"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {/* Wide feature with image */}
          <motion.article className="fcard fcard--wide" variants={fadeUp}>
            <div className="fcard__pad">
              <Icon d={ICONS.spark} />
              <h3>End-to-end brand partner</h3>
              <p>
                From your first idea to nationwide sales, a single team owns the whole build.
                Work that usually spans five suppliers collapses into one streamlined process.
              </p>
            </div>
            <div className="fcard__media">
              <Img src={IMG.gym} alt="Training" parallax={30} />
            </div>
          </motion.article>

          <motion.article className="fcard fcard--sm" variants={fadeUp}>
            <Icon d={ICONS.shield} />
            <h3>Premium manufacturing</h3>
            <p>High-quality ingredients, modern facilities and strict QC on every batch.</p>
          </motion.article>

          <motion.article className="fcard fcard--sm" variants={fadeUp}>
            <Icon d={ICONS.doc} />
            <h3>Compliance made simple</h3>
            <p>Licensing, GST, FSSAI returns and audits — handled in one place, on schedule.</p>
          </motion.article>

          {/* Tall image feature */}
          <motion.article className="fcard fcard--tall" variants={fadeUp} style={{ padding: 0, overflow: "hidden" }}>
            <div className="fcard__media" style={{ height: "100%" }}>
              <Img src={IMG.lab} alt="Quality testing" parallax={26} />
            </div>
          </motion.article>

          <motion.article className="fcard fcard--sm" variants={fadeUp}>
            <Icon d={ICONS.chart} />
            <h3>Marketing that delivers</h3>
            <p>We help customers find your brand — and give them reasons to trust it.</p>
          </motion.article>

          <motion.article className="fcard fcard--sm" variants={fadeUp}>
            <Icon d={ICONS.clock} />
            <h3>Built for the long run</h3>
            <p>Delivery isn&apos;t the end. We stay on to grow the business year after year.</p>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
