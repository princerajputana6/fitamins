import Reveal from "./Reveal.jsx";
import { Logo, ArrowRight } from "./icons.jsx";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="foot">
      <div className="wrap">
        <Reveal className="foot__cta">
          <h2 className="h2" style={{ margin: 0 }}>
            Ready to build a brand that lasts?
          </h2>
          <div className="btn-row" style={{ justifyContent: "flex-start" }}>
            <a href="#contact" className="btn btn--lime">
              Start your brand <ArrowRight />
            </a>
          </div>
        </Reveal>

        <div className="foot__top">
          <div className="foot__brand">
            <a href="#top" className="brand">
              <span className="brand__mark">
                <Logo />
              </span>
              <span className="brand__txt">
                <span className="brand__name">Fitamins</span>
                <span className="brand__sub">Healthcare Pvt. Ltd.</span>
              </span>
            </a>
            <p>
              From idea to industry. We build supplement brands end to end — and stay on to
              grow them.
            </p>
          </div>

          <div className="foot__col">
            <h4>Build</h4>
            <ul>
              <li><a href="#capabilities">Brand identity</a></li>
              <li><a href="#capabilities">Packaging &amp; design</a></li>
              <li><a href="#capabilities">Manufacturing &amp; QA</a></li>
              <li><a href="#manifest">Compliance</a></li>
            </ul>
          </div>

          <div className="foot__col">
            <h4>Grow</h4>
            <ul>
              <li><a href="#capabilities">Marketplace launch</a></li>
              <li><a href="#capabilities">Marketing &amp; SEO</a></li>
              <li><a href="#manifest">Export support</a></li>
              <li><a href="#mentorship">Mentorship</a></li>
            </ul>
          </div>

          <div className="foot__col">
            <h4>Contact</h4>
            <ul>
              <li><a href="#contact">Book free consultation</a></li>
              <li><a href="tel:+910000000000">+91 00000 00000</a></li>
              <li><a href="mailto:hello@fitamins.in">hello@fitamins.in</a></li>
              <li>India</li>
            </ul>
          </div>
        </div>

        <div className="foot__bot">
          <p>© {year} Fitamins Healthcare Pvt. Ltd. All rights reserved.</p>
          <p>ISO 22000 · ISO 9001 · GMP · HACCP</p>
        </div>
      </div>
    </footer>
  );
}
