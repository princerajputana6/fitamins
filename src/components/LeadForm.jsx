import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { STAGES, PRODUCT_CATEGORIES, validateLead } from "../data/validate.js";
import { EASE } from "../lib/motion.js";
import Reveal from "./Reveal.jsx";
import { ArrowRight, BigCheck } from "./icons.jsx";

// Where consultation requests are sent.
const LEAD_EMAIL = "connect@biztreck.world";

const INITIAL = {
  name: "",
  phone: "",
  email: "",
  stage: STAGES[0],
  category: PRODUCT_CATEGORIES[0],
  message: "",
};

/**
 * Self-contained consultation form. `idPrefix` keeps input ids/labels unique so the
 * form can render more than once on the page. With no backend, a valid submission
 * opens the visitor's email client with all details pre-filled to LEAD_EMAIL.
 */
export default function LeadForm({ idPrefix = "lead", delay = 0.08 }) {
  const formRef = useRef(null);
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | done
  const id = (k) => `${idPrefix}-${k}`;

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  function onSubmit(e) {
    e.preventDefault();
    const { valid, errors: errs, value } = validateLead(form);
    if (!valid) {
      setErrors(errs);
      const first = formRef.current?.querySelector(`[name="${Object.keys(errs)[0]}"]`);
      first?.focus();
      return;
    }
    const subject = `Consultation request — ${value.name}`;
    const body = [
      `Name: ${value.name}`,
      `Phone: ${value.phone}`,
      `Email: ${value.email}`,
      `Where they are: ${value.stage}`,
      `Product category: ${value.category}`,
      "",
      "What they want to build:",
      value.message || "-",
    ].join("\r\n");
    window.location.href = `mailto:${LEAD_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setStatus("done");
  }

  return (
    <Reveal className="form" delay={delay}>
      <AnimatePresence mode="wait">
        {status === "done" ? (
          <motion.div
            key="done"
            className="form__done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <BigCheck />
            <h3>Almost there</h3>
            <p>
              We&apos;ve opened your email app with the details filled in — just press send.
              If it didn&apos;t open, write to us at <a href={`mailto:${LEAD_EMAIL}`}>{LEAD_EMAIL}</a>.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            className="form__body"
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <div className="field-row">
              <div className="field">
                <label htmlFor={id("name")}>Your name</label>
                <input
                  id={id("name")}
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Full name"
                  value={form.name}
                  onChange={set("name")}
                  className={errors.name ? "has-error" : ""}
                />
                {errors.name && <p className="field__err">{errors.name}</p>}
              </div>
              <div className="field">
                <label htmlFor={id("phone")}>Phone</label>
                <input
                  id={id("phone")}
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+91"
                  value={form.phone}
                  onChange={set("phone")}
                  className={errors.phone ? "has-error" : ""}
                />
                {errors.phone && <p className="field__err">{errors.phone}</p>}
              </div>
            </div>

            <div className="field">
              <label htmlFor={id("email")}>Email</label>
              <input
                id={id("email")}
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={set("email")}
                className={errors.email ? "has-error" : ""}
              />
              {errors.email && <p className="field__err">{errors.email}</p>}
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor={id("stage")}>Where you are</label>
                <select id={id("stage")} name="stage" value={form.stage} onChange={set("stage")}>
                  {STAGES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor={id("category")}>Product category</label>
                <select
                  id={id("category")}
                  name="category"
                  value={form.category}
                  onChange={set("category")}
                >
                  {PRODUCT_CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field">
              <label htmlFor={id("message")}>What do you want to build?</label>
              <textarea
                id={id("message")}
                name="message"
                placeholder="Target customer, price point, launch timeline, anything already decided."
                value={form.message}
                onChange={set("message")}
              />
            </div>

            <motion.button type="submit" className="btn btn--primary" whileTap={{ scale: 0.98 }}>
              Book free consultation
              <ArrowRight />
            </motion.button>
            <p className="form__fine">
              We reply within one working day. Your details stay with our team.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </Reveal>
  );
}
