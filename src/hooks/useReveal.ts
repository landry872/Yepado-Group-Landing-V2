import { useEffect } from "react";

/**
 * Fades up every [data-reveal] element once it scrolls into view, mirroring
 * the source design's reveal-on-scroll behaviour (IntersectionObserver +
 * a fail-safe timeout so content never stays hidden if something goes wrong).
 */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!els.length) return;

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    els.forEach((el) => io.observe(el));

    const failSafe = window.setTimeout(() => {
      els.forEach((el) => el.classList.add("is-visible"));
    }, 6000);

    return () => {
      io.disconnect();
      window.clearTimeout(failSafe);
    };
  }, []);
}
