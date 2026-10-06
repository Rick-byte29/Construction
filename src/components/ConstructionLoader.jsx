import { useEffect, useState } from "react";

const LOAD_WINDOW_MS = 1450;

export default function ConstructionLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeout = window.setTimeout(() => setVisible(false), reducedMotion ? 900 : LOAD_WINDOW_MS);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div className={`construction-loader ${visible ? "" : "construction-loader-hidden"}`} aria-hidden={!visible}>
      <div className="construction-loader-content" role="status" aria-live="polite">
        <img className="loader-logo" src="/assets/khargo-logo.webp" alt="KHARGO CONSTRUCTIONS" />
        <div className="construction-scene" aria-hidden="true">
          <div className="scene-ground" />
          <div className="scene-building">
            <i className="building-floor floor-one" /><i className="building-floor floor-two" />
            <i className="building-column column-a" /><i className="building-column column-b" />
            <i className="building-column column-c" /><i className="building-column column-d" />
            <i className="building-beam beam-front" /><i className="building-beam beam-side" />
            <i className="building-wall" />
          </div>
          <div className="scene-crane">
            <i className="crane-mast" /><i className="crane-jib" /><i className="crane-brace" />
            <i className="crane-cable" /><i className="crane-hook" />
          </div>
          <div className="scene-load"><i /><i /><i /></div>
          <div className="scene-glow" />
        </div>
        <p className="loader-message">Setting the foundations<span aria-hidden="true">…</span></p>
        <div className="loader-progress" aria-hidden="true"><span /></div>
      </div>
    </div>
  );
}
