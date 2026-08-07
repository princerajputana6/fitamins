import { useRef } from "react";
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Move the rail left as the user scrolls through the pinned section.
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-78%"]);
  const barScale = useTransform(scrollYProgress, [0, 1], [0.06, 1]);

  return (
    // Tall spacer drives the pinned sticky viewport (one screen per ~scroll).
    <section className="pin" id="process" ref={ref} style={{ height: "320vh" }}>
      <div className="pin__sticky">
        <div className="pin__head">
          <p className="eyebrow eyebrow--lime">How it runs</p>
          <h2 className="h2">Eight stages, one timeline.</h2>
          <p className="lead">
            The order matters — each stage unlocks the next. Months of scattered vendor work
            compresses into a single, choreographed launch.
          </p>
        </div>

        <motion.div className="pin__rail" style={{ x }}>
          {STEPS.map((s, i) => (
            <article className="pcard" key={s.no}>
              <div className="pcard__media">
                <span className="pcard__no">{s.no}</span>
                <img src={PROCESS_IMG[i]} alt={s.title} />
              </div>
              <div className="pcard__body">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </article>
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
