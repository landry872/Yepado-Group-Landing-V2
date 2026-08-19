import { useEffect, useRef, useState } from "react";
import { chapters } from "../data/about";
import "./AboutScrolly.css";

const GROUP_SIZE = 2;

function wordsOf(lead: string, rest: string) {
  return `${lead} ${rest}`.trim().split(/\s+/);
}

export default function AboutScrolly() {
  const driverRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [local, setLocal] = useState(0);

  // Same pinned scroll-driven treatment on every screen size — mobile only
  // hides the ghost number and reflows the text column narrower (see the
  // media queries in AboutScrolly.css). Keeping one render path (instead of
  // a separate mobile-only tree) is what guarantees mobile actually gets
  // the exact same scroll animation as desktop, not a lookalike.
  useEffect(() => {
    let raf = 0;
    let prevIdx = 0;
    let prevLocal = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const el = driverRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const span = Math.max(1, r.height - window.innerHeight);
      const ap = Math.min(1, Math.max(0, -r.top / span));
      const f = ap * chapters.length;
      const i = Math.min(chapters.length - 1, Math.floor(f));
      const l = Math.min(1, Math.max(0, f - i));
      const lq = Math.round(l * 50) / 50;
      if (i !== prevIdx || lq !== prevLocal) {
        prevIdx = i;
        prevLocal = lq;
        setIdx(i);
        setLocal(lq);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const chapter = chapters[idx];
  const rawWords = wordsOf(chapter.lead, chapter.rest);
  const numGroups = Math.ceil(rawWords.length / GROUP_SIZE);
  const colorProg = Math.min(1, local / 0.82);

  return (
    <section id="groupe" data-screen-label="03 À propos" data-theme="dark" aria-labelledby="groupe-title" className="yg-about">
      <h2 id="groupe-title" className="yg-visually-hidden">
        À propos de Yepado Group
      </h2>
      <div ref={driverRef} className="yg-about-driver">
        <div className="yg-about-sticky">
          {chapters.map((c, i) => (
            <div key={c.id} aria-hidden="true" className="yg-about-media" style={{ opacity: i === idx ? 1 : 0 }}>
              <video
                src={c.video}
                autoPlay
                muted
                loop
                playsInline
                className="yg-about-video"
                style={{ objectPosition: c.objectPosition }}
              />
            </div>
          ))}
          <div aria-hidden="true" className="yg-about-gradient" />

          <div className="yg-about-content">
            <div className="yg-about-top">
              <div className="yg-about-text">
                <p className="yg-about-eyebrow">{chapter.title}</p>
                <p className="yg-about-statement">
                  {rawWords.map((word, wi) => {
                    const g = Math.floor(wi / GROUP_SIZE);
                    const on = colorProg * numGroups > g;
                    return (
                      <span key={wi} style={{ color: on ? "#5CC8F0" : "rgba(255,255,255,.3)" }}>
                        {word}
                        {wi < rawWords.length - 1 ? " " : ""}
                      </span>
                    );
                  })}
                </p>
              </div>
              <span aria-hidden="true" className="yg-about-number">
                {String(idx + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="yg-about-steps">
              {chapters.map((c, i) => {
                const fill = i < idx ? 1 : i === idx ? Math.min(1, local) : 0;
                return (
                  <div key={c.id} className="yg-about-step">
                    <span className="yg-about-step-track">
                      <span className="yg-about-step-fill" style={{ transform: `scaleX(${fill})` }} />
                    </span>
                    <span className="yg-about-step-label" style={{ color: i === idx ? "#fff" : "rgba(255,255,255,.4)" }}>
                      {String(i + 1).padStart(2, "0")} · {c.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
