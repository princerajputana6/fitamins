import Reveal from "./Reveal.jsx";

export default function Statement() {
  return (
    <section className="sec sec--tight statement">
      <div className="wrap statement__grid">
        <Reveal as="h2" className="statement__big">
          We don&apos;t just manufacture supplements.
          <br />
          <span>We build brands that last.</span>
        </Reveal>
        <Reveal className="statement__body" delay={0.08}>
          <p>
            At <strong>Fitamins Healthcare Pvt. Ltd.</strong>, we help entrepreneurs turn a
            vision into a working nutrition brand. Formulation and manufacturing are the
            starting point, not the finish line.
          </p>
          <p>
            Branding, marketing, compliance and business growth all sit with the same team —
            so nothing gets handed off, duplicated or dropped between vendors. We stay your
            partner at every stage of the journey.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
