import { useEffect, useRef, useState } from "react";
import { heroVideos } from "../data/about";
import { ArrowIcon } from "./Header";
import "./Hero.css";

const HERO_DUR = 8; // seconds per clip before crossfading to the next one

function easeInOutQuad(p: number): number {
  return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
}

export default function Hero() {
  const driverRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const slot0Ref = useRef<HTMLVideoElement>(null);
  const slot1Ref = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const dotFillRefs = useRef<Array<HTMLSpanElement | null>>([]);

  const [activeSlot, setActiveSlot] = useState<0 | 1>(0);
  const [heroIdx, setHeroIdx] = useState(0);
  const activeSlotRef = useRef<0 | 1>(0);
  const heroIdxRef = useRef(0);
  const advancingRef = useRef(false);

  // Only tablet/desktop get the sticky scroll-pin/zoom treatment — on mobile
  // the video should just fill the hero once, full-bleed, no scroll-jacking.
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia("(min-width: 768px)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Sticky-pinned card: interpolate width/height/margin/radius with scroll
  // progress through the 220vh driver, and keep the video + overlay visually
  // pinned to the viewport as the card shrinks (counter-translate trick).
  // Desktop/tablet only — see `isDesktop` above.
  useEffect(() => {
    if (!isDesktop) return;
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const driver = driverRef.current;
      const card = cardRef.current;
      if (!driver || !card) return;

      const d = driver.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const span = Math.max(1, d.height - vh);
      const p = Math.min(1, Math.max(0, -d.top / span));
      const e = easeInOutQuad(p);

      const navH = 80;
      const w0 = Math.min(1800, vw - 112);
      const h0 = Math.max(440, Math.min(vh * 0.82, 840));
      const mt0 = navH + 36;
      const mt = mt0 * (1 - e);
      const w = w0 + (vw - w0) * e;
      const h = h0 + (vh - h0) * e;
      const rad = 24 * (1 - e);

      card.style.width = w + "px";
      card.style.height = h + "px";
      card.style.borderRadius = rad + "px";
      card.style.marginTop = mt + "px";

      const cr = card.getBoundingClientRect();
      const t = `translate3d(${-cr.left}px,${-cr.top}px,0)`;
      if (slot0Ref.current) slot0Ref.current.style.transform = t;
      if (slot1Ref.current) slot1Ref.current.style.transform = t;
      if (overlayRef.current) overlayRef.current.style.transform = t;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isDesktop]);

  // Clear any inline styles left over from desktop mode so the mobile CSS
  // (full-bleed, no pin/zoom) takes over cleanly, e.g. after a resize. Only
  // touch the specific properties the tick above sets imperatively — the
  // video elements also carry a React-managed `opacity`, so we leave that
  // (and the rest of `style`) alone.
  useEffect(() => {
    if (isDesktop) return;
    const card = cardRef.current;
    if (card) {
      card.style.width = "";
      card.style.height = "";
      card.style.borderRadius = "";
      card.style.marginTop = "";
    }
    if (slot0Ref.current) slot0Ref.current.style.transform = "";
    if (slot1Ref.current) slot1Ref.current.style.transform = "";
    if (overlayRef.current) overlayRef.current.style.transform = "";
  }, [isDesktop]);

  // Each slot's `object-position` must track whichever clip is CURRENTLY
  // loaded into it (swapped imperatively below), not the slot's fixed JSX
  // index — so it's set imperatively too, here and on mount, rather than
  // through React's `style` prop.
  useEffect(() => {
    if (slot0Ref.current) slot0Ref.current.style.objectPosition = heroVideos[0].objectPosition;
    if (slot1Ref.current) slot1Ref.current.style.objectPosition = heroVideos[1].objectPosition;
  }, []);

  const advanceHero = () => {
    const nextIdx = (heroIdxRef.current + 1) % heroVideos.length;
    const inactive = activeSlotRef.current === 0 ? 1 : 0;
    const nextVideo = heroVideos[nextIdx];
    const ref = inactive === 0 ? slot0Ref : slot1Ref;
    if (ref.current) {
      ref.current.src = nextVideo.src;
      ref.current.style.objectPosition = nextVideo.objectPosition;
      ref.current.currentTime = 0;
      ref.current.play().catch(() => {});
    }
    window.setTimeout(() => {
      heroIdxRef.current = nextIdx;
      activeSlotRef.current = inactive;
      setHeroIdx(nextIdx);
      setActiveSlot(inactive);
      const fillEl = dotFillRefs.current[nextIdx];
      if (fillEl) fillEl.style.transform = "scaleX(0)";
      advancingRef.current = false;
    }, 150);
  };

  const onTimeUpdate = (slot: 0 | 1) => (e: React.SyntheticEvent<HTMLVideoElement>) => {
    if (slot !== activeSlotRef.current) return;
    const v = e.currentTarget;
    const p = Math.min(1, v.currentTime / HERO_DUR);
    const fillEl = dotFillRefs.current[heroIdxRef.current];
    if (fillEl) fillEl.style.transform = `scaleX(${p})`;
    if (v.currentTime >= HERO_DUR && !advancingRef.current) {
      advancingRef.current = true;
      advanceHero();
    }
  };

  return (
    <section id="portefeuille" data-screen-label="01 Hero" aria-labelledby="hero-title" className="yg-hero">
      <div id="hero-driver" ref={driverRef} className="yg-hero-driver">
        <div className="yg-hero-sticky">
          <div ref={cardRef} className="yg-hero-card">
            <video
              ref={slot0Ref}
              src={heroVideos[0].src}
              poster={heroVideos[0].poster}
              autoPlay
              muted
              playsInline
              onTimeUpdate={onTimeUpdate(0)}
              aria-label="Vidéo d'accueil Yepado Group"
              className="yg-hero-video"
              style={{ opacity: activeSlot === 0 ? 1 : 0 }}
            />
            <video
              ref={slot1Ref}
              src={heroVideos[1].src}
              muted
              playsInline
              onTimeUpdate={onTimeUpdate(1)}
              aria-hidden="true"
              className="yg-hero-video"
              style={{ opacity: activeSlot === 1 ? 1 : 0 }}
            />
            <div ref={overlayRef} aria-hidden="true" className="yg-hero-overlay" />

            <div aria-hidden="true" className="yg-hero-dots">
              {heroVideos.map((_, i) => (
                <span key={i} className="yg-hero-dot" style={{ width: i === heroIdx ? 30 : 7 }}>
                  <span
                    ref={(el) => {
                      dotFillRefs.current[i] = el;
                    }}
                    className="yg-hero-dot-fill"
                    style={{ transform: `scaleX(${i < heroIdx ? 1 : i === heroIdx ? 0 : 0})` }}
                  />
                </span>
              ))}
            </div>

            <div className="yg-hero-content">
              <h1 id="hero-title" className="yg-hero-title">
                Des technologies et des solutions
                <br />
                pour faire avancer l’Afrique
              </h1>
              <p className="yg-hero-lead">
                Yepado Group conçoit et exploite un écosystème d’entreprises qui répond aux défis de la mobilité, de la
                fintech, de la technologie et du développement commercial en Afrique.
              </p>
              <div className="yg-hero-ctas">
                <a href="#groupe" className="yg-btn yg-hero-cta-primary">
                  Découvrir le groupe
                  <ArrowIcon />
                </a>
                <a href="#filiales" className="yg-btn yg-hero-cta-secondary">
                  Explorer nos solutions
                  <ArrowIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
