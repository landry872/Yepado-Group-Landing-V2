import { useEffect, useRef, useState } from "react";
import { solutions } from "../data/solutions";
import { ArrowIcon } from "./Header";
import "./Solutions.css";

const DESKTOP_BASE_TOP = "clamp(90px,12vh,140px)";

export default function Solutions() {
  const introRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(() => window.matchMedia("(max-width: 767px)").matches);
  // On mobile the intro sits ABOVE the cards in one column instead of
  // beside them, so the cards can't share the intro's own sticky offset —
  // card 1 would stick at the same spot and cover it. Measuring exactly
  // where the (sticky) intro's bottom edge lands keeps card 1 anchored
  // right below it regardless of how many lines the intro text wraps to.
  const [mobileBaseTop, setMobileBaseTop] = useState<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const measure = () => {
      const el = introRef.current;
      if (!el) return;
      const top = parseFloat(getComputedStyle(el).top) || 0;
      setMobileBaseTop(top + el.offsetHeight + 16);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isMobile]);

  return (
    <section id="solutions" data-screen-label="05 Solutions" aria-labelledby="solutions-title" className="yg-solutions">
      <div className="yg-solutions-inner">
        <div className="yg-solutions-head">
          <div ref={introRef} className="yg-solutions-intro">
            <h2 id="solutions-title" className="yg-solutions-title">
              Des solutions qui accompagnent la croissance des entreprises
            </h2>
            <p className="yg-solutions-lead">
              Un portefeuille d’entreprises qui adressent chacune un besoin réel de la mobilité, de la fintech et de la
              technologie en Afrique.
            </p>
          </div>

          <div className="yg-solutions-stack">
            {solutions.map((s, i) => (
              <article
                key={s.key}
                className="yg-sol-card"
                style={{
                  top:
                    isMobile && mobileBaseTop != null
                      ? `${mobileBaseTop + i * 16}px`
                      : `calc(${DESKTOP_BASE_TOP} + ${i * 16}px)`,
                }}
              >
                <img src={s.photo} alt={s.name} className="yg-sol-photo" />
                <div aria-hidden="true" className="yg-sol-base yg-sol-gradient" />
                <div className="yg-sol-base yg-sol-info">
                  <img src={s.logoWhite} alt={`Logo ${s.name}`} className="yg-sol-logo" style={{ height: `${s.logoHeightCqw}cqw` }} />
                  <h3 className="yg-sol-heading">{s.title}</h3>
                  <p className="yg-sol-desc">{s.desc}</p>
                </div>
                <div className="yg-sol-hover">
                  <a href="#filiales" className="yg-btn yg-sol-btn yg-sol-hover-cta">
                    {s.ctaLabel}
                    <ArrowIcon />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
