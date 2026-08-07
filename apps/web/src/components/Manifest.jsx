import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  animate,
  useTransform,
} from "framer-motion";
import { DIVISIONS, ALL, TOTAL } from "@fitamins/shared/deliverables";
import Reveal from "./Reveal.jsx";
import { SearchIcon } from "./icons.jsx";

const NUMBERED = ALL.map((o, i) => ({
  ...o,
  no: String(i + 1).padStart(3, "0"),
  id: `${o.div}-${i}`,
  search: `${o.name} ${o.divName}`.toLowerCase(),
}));

function CountUp({ target }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, target, {
      duration: 1.3,
      ease: [0.22, 0.61, 0.36, 1],
    });
    return controls.stop;
  }, [inView, target, count]);
  return (
    <p className="counter" ref={ref}>
      <motion.span>{rounded}</motion.span>
      <sup>deliverables</sup>
    </p>
  );
}

export default function Manifest() {
  const [activeDiv, setActiveDiv] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return NUMBERED.filter((o) => {
      const okDiv = activeDiv === "all" || o.div === activeDiv;
      const okQ = !q || o.search.includes(q);
      return okDiv && okQ;
    });
  }, [activeDiv, query]);

  const chips = [
    { id: "all", short: "All", count: TOTAL },
    ...DIVISIONS.map((d) => ({ id: d.id, short: d.short, count: d.items.length })),
  ];

  return (
    <section className="sec bg-paper" id="manifest">
      <div className="wrap">
        <div className="manifest__top">
          <Reveal>
            <p className="eyebrow">The full itemised list</p>
            <h2 className="h2" style={{ maxWidth: "16ch" }}>
              Every line is something we hand over.
            </h2>
            <p className="lead">
              Not a capability we could arrange — a deliverable you receive. Filter by
              division or search for whatever you think you&apos;re missing.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <CountUp target={TOTAL} />
          </Reveal>
        </div>

        <div className="filters">
          <div className="search">
            <SearchIcon />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search 54 deliverables — try label, Amazon, FSSAI…"
              aria-label="Search deliverables"
            />
          </div>
          <div className="chips" role="group" aria-label="Filter by division">
            {chips.map((c) => {
              const on = activeDiv === c.id;
              return (
                <button
                  key={c.id}
                  className={`chip${on ? " is-active" : ""}`}
                  aria-pressed={on}
                  onClick={() => setActiveDiv(c.id)}
                >
                  {c.short} <b>{c.count}</b>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div className="items" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((o) => (
              <motion.article
                className="item"
                key={o.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <span className="item__no">{o.no}</span>
                <div className="item__body">
                  <div className="item__name">{o.name}</div>
                  <div className="item__div">{o.divName}</div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.div className="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <b>Nothing matches that yet.</b>
              Clear the search or ask us directly — if it belongs in a supplement brand, we
              probably build it.
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
