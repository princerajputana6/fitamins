import { motion } from "framer-motion";

const WORDS = [
  "Formulation",
  "GMP Manufacturing",
  "Packaging",
  "Compliance",
  "eCommerce",
  "Amazon & Flipkart",
  "Performance Marketing",
  "Export",
  "Mentorship",
];

function Row({ items }) {
  return (
    <>
      {items.map((w, i) => (
        <span className="mq-item" key={i}>
          <i />
          {w}
        </span>
      ))}
    </>
  );
}

export default function Marquee({ dark = false, reverse = false, duration = 34 }) {
  return (
    <div className={`marquee${dark ? " marquee--dark" : ""}`} aria-hidden="true">
      <motion.div
        className="mq-track"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        <Row items={WORDS} />
        <Row items={WORDS} />
      </motion.div>
    </div>
  );
}
