import { useState } from "react";
import Reveal from "./Reveal.jsx";
import { BRANDS } from "../data/brands.js";

/* Single logo tile. Falls back to a wordmark chip if the artwork is missing. */
function BrandTile({ name, logo, dark }) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className={`brandtile${dark ? " brandtile--dark" : ""}`} title={name}>
      {failed ? (
        <span className="brandtile__word">{name}</span>
      ) : (
        <img
          src={logo}
          alt={name}
          loading="lazy"
          draggable="false"
          onError={() => setFailed(true)}
        />
      )}
    </figure>
  );
}

export default function Brands() {
  // Duplicate the set so the track can loop seamlessly (-50% translate).
  const loop = [...BRANDS, ...BRANDS];
  return (
    <section className="sec sec--tight bg-paper brands" id="brands">
      <div className="wrap">
        <Reveal className="brands__head">
          <p className="eyebrow">Brands we&apos;ve built</p>
          <h2 className="h2 brands__title">
            Real labels, <span className="accent">launched &amp; scaling</span>
          </h2>
        </Reveal>
      </div>

      <div className="brands__rail" aria-label="Brands built with Fitamins">
        <div className="brands__track">
          {loop.map((b, i) => (
            <BrandTile key={i} {...b} />
          ))}
        </div>
      </div>
    </section>
  );
}
