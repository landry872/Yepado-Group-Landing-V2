import { useEffect, useRef, useState } from "react";
import { filiales, sectorOf } from "../data/filiales";
import "./Header.css";

const NAV_LINKS = [
  { href: "#chiffres", label: "Chiffres clés" },
  { href: "#groupe", label: "Le Groupe" },
  { href: "#partenaires", label: "Partenaires" },
  { href: "#filiales", label: "Filiales" },
  { href: "#solutions", label: "Solutions" },
];

function easeInOutQuad(p: number): number {
  return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
}

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const logoColorRef = useRef<HTMLImageElement>(null);
  const logoWhiteRef = useRef<HTMLImageElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filialesOpen, setFilialesOpen] = useState(false);

  // The nav pill's width-shrinking animation (tied to the hero card's own
  // scroll progress) is a desktop/tablet-only flourish — the CTA/links it's
  // widening or narrowing around aren't even shown on mobile. Driving it off
  // `window.innerWidth` there also isn't reliable: on some mobile browsers
  // that value can disagree with the `vw`/`%` units the CSS fallback uses,
  // which threw the pill's width and centering off. Mobile instead gets a
  // plain CSS `width: 80%` (see Header.css) with no JS involved.
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia("(min-width: 768px)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    let raf = 0;
    let lastY = 0;
    let navHidden = false;
    let prevScrolled = false;

    const tick = () => {
      raf = requestAnimationFrame(tick);

      const y = window.scrollY;
      const heroEl = document.getElementById("portefeuille");
      const heroDriver = document.getElementById("hero-driver");

      // Show/hide the header depending on scroll direction, once past the hero.
      const delta = y - lastY;
      const pastHero = heroEl ? heroEl.getBoundingClientRect().bottom <= 40 : false;
      if (y <= 140) navHidden = false;
      else if (delta > 4 && pastHero) navHidden = true;
      else if (delta < -4) navHidden = false;
      if (headerRef.current) {
        headerRef.current.style.transform = navHidden ? "translateY(calc(-100% - 24px))" : "translateY(0)";
      }
      lastY = y;

      // Dark (white-on-dark) whenever a dark-themed section spans the
      // header's vertical position.
      let isDark = false;
      document.querySelectorAll('[data-theme="dark"]').forEach((el) => {
        const b = el.getBoundingClientRect();
        if (b.top <= 66 && b.bottom >= 66) isDark = true;
      });
      const isScrolled = heroEl ? heroEl.getBoundingClientRect().top < -80 : false;

      // Nav pill chrome (width/background/border/shadow) tracks the hero
      // card's own scroll-driven expansion progress.
      let e = 0;
      if (heroDriver) {
        const r = heroDriver.getBoundingClientRect();
        const span = Math.max(1, r.height - window.innerHeight);
        const p = Math.min(1, Math.max(0, -r.top / span));
        e = easeInOutQuad(p);
      }

      // Everything color-related (pill background AND the logo/text/CTA
      // that sit on top of it) is set imperatively right here, from the
      // same `isDark` value, in the same frame — so the pill's background
      // and its foreground can never fall out of sync with each other via
      // a React re-render lag (that mismatch is what previously made the
      // white logo/links disappear onto an also-white pill).
      if (navRef.current) {
        const ns = navRef.current.style;
        if (isDesktop) {
          const vw = window.innerWidth;
          // Same 112px margin as the hero card (56px each side) so the nav
          // pill's resting width lines up with it instead of running wider.
          const avail = vw - 112;
          const navStart = Math.min(1800, avail);
          const navTarget = Math.min(1143, avail);
          const navW = navStart + (navTarget - navStart) * e;
          ns.width = navW + "px";
          ns.maxWidth = "none";
        }
        ns.background = isDark ? `rgba(1,13,89,${e.toFixed(3)})` : `rgba(255,255,255,${e.toFixed(3)})`;
        ns.borderColor = isDark ? `rgba(255,255,255,${(0.14 * e).toFixed(3)})` : `rgba(236,238,242,${e.toFixed(3)})`;
        ns.boxShadow = e > 0.02 ? `0 6px 28px rgba(16,24,40,${(0.08 * e).toFixed(3)})` : "none";
        ns.setProperty("--nav-text", isDark ? "#FFFFFF" : "#010D59");
        ns.setProperty("--nav-muted", isDark ? "rgba(255,255,255,.6)" : "#6B7280");
        ns.setProperty("--nav-cta-bg", isDark ? "#FFFFFF" : "#010D59");
        ns.setProperty("--nav-cta-text", isDark ? "#010D59" : "#FFFFFF");
      }
      if (logoColorRef.current) logoColorRef.current.style.opacity = isDark ? "0" : "1";
      if (logoWhiteRef.current) logoWhiteRef.current.style.opacity = isDark ? "1" : "0";

      if (isScrolled !== prevScrolled) {
        prevScrolled = isScrolled;
        setScrolled(isScrolled);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isDesktop]);

  // Clear the desktop-only inline width so the mobile `width: 80%` CSS rule
  // applies cleanly, e.g. after a resize across the breakpoint.
  useEffect(() => {
    if (isDesktop || !navRef.current) return;
    navRef.current.style.width = "";
    navRef.current.style.maxWidth = "";
  }, [isDesktop]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <a href="#contenu" className="skip-link">
        Aller au contenu
      </a>

      <header ref={headerRef} className={`yg-header${scrolled ? " is-scrolled" : ""}`}>
        <div ref={navRef} className="yg-nav">
          <a href="#" className="yg-brand" aria-label="Yepado Group — accueil">
            <span className="yg-brand-stack">
              <img ref={logoColorRef} src="/logos/group-color.svg" alt="Yepado Group" className="yg-brand-img" style={{ opacity: 1 }} />
              <img
                ref={logoWhiteRef}
                src="/logos/group-white.svg"
                alt=""
                aria-hidden="true"
                className="yg-brand-img yg-brand-img-overlay"
                style={{ opacity: 0 }}
              />
            </span>
          </a>

          <nav aria-label="Navigation principale" className="yg-nav-links">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="yg-nav-link">
                {l.label}
              </a>
            ))}
          </nav>

          <a href="#contact" className="yg-btn yg-nav-cta">
            Nous contacter
            <ArrowIcon />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label="Ouvrir le menu"
            className="yg-burger"
          >
            <span className={mobileOpen ? "bar bar-top open" : "bar bar-top"} />
            <span className={mobileOpen ? "bar bar-mid open" : "bar bar-mid"} />
            <span className={mobileOpen ? "bar bar-bot open" : "bar bar-bot"} />
          </button>
        </div>
      </header>

      <div role="dialog" aria-label="Menu" className={`yg-drawer${mobileOpen ? " is-open" : ""}`}>
        <div className="yg-drawer-top">
          <img src="/logos/group-color.svg" alt="Yepado Group" style={{ height: 32 }} />
          <button type="button" onClick={closeMobile} aria-label="Fermer le menu" className="yg-drawer-close">
            ×
          </button>
        </div>
        <div className="yg-drawer-body">
          <button
            type="button"
            onClick={() => setFilialesOpen((v) => !v)}
            aria-expanded={filialesOpen}
            className="yg-drawer-accordion-btn"
          >
            Filiales <span className="mono">{filialesOpen ? "−" : "+"}</span>
          </button>
          <div className="yg-drawer-accordion" style={{ maxHeight: filialesOpen ? 640 : 0 }}>
            {filiales.map((f) => (
              <a
                key={f.key}
                href={`#filiale-${f.key}`}
                onClick={() => {
                  closeMobile();
                  window.dispatchEvent(new CustomEvent("yg:goto-filiale", { detail: f.key }));
                }}
                className="yg-drawer-filiale"
              >
                <span className="name">{f.name}</span>
                <span className="sector mono">{sectorOf(f.sector).name}</span>
              </a>
            ))}
          </div>
          <nav aria-label="Navigation mobile" className="yg-drawer-nav">
            {/* "Filiales" is deliberately left out here — the accordion right
                above already covers that entry point; repeating it as a
                plain link too just duplicated it. */}
            {NAV_LINKS.filter((l) => l.href !== "#filiales").map((l) => (
              <a key={l.href} href={l.href} onClick={closeMobile}>
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="yg-drawer-footer">
          <a href="#contact" onClick={closeMobile} className="yg-drawer-cta">
            Nous contacter
          </a>
        </div>
      </div>
    </>
  );
}

function ArrowIcon() {
  return (
    <span className="yg-arrow" aria-hidden="true">
      <svg viewBox="0 0 14 14" fill="none">
        <path d="M2.91699 7L11.0837 7" stroke="currentColor" strokeWidth="1.45833" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M7 2.91602L11.0833 6.99935L7 11.0827"
          stroke="currentColor"
          strokeWidth="1.45833"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export { ArrowIcon };
