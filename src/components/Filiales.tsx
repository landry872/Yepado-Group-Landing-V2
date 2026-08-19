import { useEffect, useMemo, useRef, useState } from "react";
import { ctaLabel, filiales, logoPath, sectors } from "../data/filiales";
import { ArrowIcon } from "./Header";
import "./Filiales.css";

type FilterId = "all" | (typeof sectors)[number]["id"];

export default function Filiales() {
  const [filter, setFilter] = useState<FilterId>("all");
  const tablistRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const tabs = useMemo(
    () => [
      { id: "all" as FilterId, label: "Tout voir", n: filiales.length },
      ...sectors.map((s) => ({ id: s.id as FilterId, label: s.name, n: filiales.filter((f) => f.sector === s.id).length })),
    ],
    [],
  );

  const visible = useMemo(() => filiales.filter((f) => filter === "all" || f.sector === filter), [filter]);

  const moveUnderline = () => {
    const u = underlineRef.current;
    const list = tablistRef.current;
    if (!u || !list) return;
    const tabEls = list.querySelectorAll<HTMLElement>('[role="tab"]');
    const idx = tabs.findIndex((t) => t.id === filter);
    const el = tabEls[idx];
    if (!el) return;
    u.style.width = el.offsetWidth + "px";
    u.style.transform = `translateX(${el.offsetLeft}px)`;
  };

  useEffect(() => {
    moveUnderline();
    window.addEventListener("resize", moveUnderline);
    return () => window.removeEventListener("resize", moveUnderline);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const scroll = (dir: 1 | -1) => {
    const t = trackRef.current;
    if (!t) return;
    const card = t.querySelector("article");
    const step = card ? card.getBoundingClientRect().width + 28 : 380;
    t.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  // The mobile nav drawer links to a specific filiale, not just the section
  // — reset the sector filter so the card is actually in the DOM, then
  // scroll it into view (both the page and the horizontal carousel track).
  useEffect(() => {
    const onGoto = (e: Event) => {
      const key = (e as CustomEvent<string>).detail;
      setFilter("all");
      window.setTimeout(() => {
        document.getElementById(`filiale-${key}`)?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
      }, 400);
    };
    window.addEventListener("yg:goto-filiale", onGoto);
    return () => window.removeEventListener("yg:goto-filiale", onGoto);
  }, []);

  return (
    <section id="filiales" data-screen-label="04 Filiales" aria-labelledby="filiales-title" className="yg-filiales">
      <div className="yg-filiales-inner">
        <div data-reveal="1" className="yg-filiales-head">
          <h2 id="filiales-title" className="yg-filiales-title">
            Dix entreprises,
            <br />
            une même vision
          </h2>
        </div>

        <div role="tablist" aria-label="Filtrer par secteur" ref={tablistRef} data-rail="1" className="yg-filiales-tabs">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={filter === t.id}
              onClick={() => setFilter(t.id)}
              className="yg-filiales-tab"
              style={{ color: filter === t.id ? "#002E9E" : "#6B7280" }}
            >
              {t.label} ({t.n})
            </button>
          ))}
          <span ref={underlineRef} aria-hidden="true" className="yg-filiales-underline" />
        </div>

        <div ref={trackRef} className="yg-filiales-track">
          {visible.map((f) => (
            <article key={f.key} id={`filiale-${f.key}`} className="yg-filiale-card">
              <div className="yg-filiale-logo-row">
                {f.logo ? (
                  <span className="yg-band-logo">
                    <span className="yg-band-wrap">
                      <img src={logoPath(f.logo, "navy")} alt={`Logo ${f.name}`} className="yg-band-navy" style={{ maxHeight: f.lh }} />
                      <img
                        src={logoPath(f.logo, "color")}
                        alt=""
                        aria-hidden="true"
                        className="yg-band-color"
                        style={{ maxHeight: f.lh }}
                      />
                    </span>
                  </span>
                ) : (
                  <span className="yg-filiale-wordmark">{f.name}</span>
                )}
              </div>

              <p className="yg-filiale-desc">{f.desc}</p>

              <div>
                {f.cta === "contact" ? (
                  <a href="#contact" className="yg-btn yg-filiale-cta">
                    Nous contacter
                    <ArrowIcon />
                  </a>
                ) : (
                  <span className="yg-btn yg-filiale-cta yg-filiale-cta-external">
                    {ctaLabel(f.cta)}
                    <ArrowIcon />
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="yg-filiales-nav-buttons">
          <button type="button" onClick={() => scroll(-1)} aria-label="Précédent" className="yg-filiales-nav-btn">
            ‹
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label="Suivant" className="yg-filiales-nav-btn">
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
