import { useState } from "react";

/**
 * Brand lockup — renders ONLY the Fitamins logo (no accompanying text).
 * Drop the artwork at `apps/web/public/logo.png` (or .svg and update src).
 * Until that file exists, a clean wordmark fallback renders so nothing looks broken.
 * The logo is a black wordmark; on dark surfaces (hero-nav, footer) CSS inverts it to white.
 */
export default function Brand({ href = "#top", className = "" }) {
  const [failed, setFailed] = useState(false);
  return (
    <a href={href} className={`brand ${className}`} aria-label="Fitamins Healthcare, home">
      {failed ? (
        <span className="brand__word" aria-hidden="true">
          Fitamins<i>Healthcare</i>
        </span>
      ) : (
        <img
          className="brand__logo"
          src="/logo.png"
          alt="Fitamins Healthcare"
          onError={() => setFailed(true)}
        />
      )}
    </a>
  );
}
