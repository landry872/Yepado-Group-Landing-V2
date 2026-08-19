export type CtaKind = "site" | "app" | "contact";

export interface Sector {
  id: string;
  name: string;
  color: string;
}

export interface Filiale {
  /** logo file slug, e.g. "psa" -> /logos/psa-navy.svg, /logos/psa-color.svg */
  key: string;
  name: string;
  sector: string;
  /** logo slug used to build /logos/{logo}-{variant}.svg paths; undefined = text-only wordmark */
  logo?: string;
  /** card logo height */
  lh: string;
  /** marquee band logo height */
  bandH: string;
  cta: CtaKind;
  desc: string;
  tagline?: string;
}

export interface Partner {
  name: string;
  logo: string;
}

export interface Solution {
  key: string;
  name: string;
  photo: string;
  logoWhite: string;
  /**
   * Logo height as a percentage of the card's own width (a `cqw` value —
   * see `container-type: inline-size` on `.yg-sol-card`). Keeping this
   * relative to the card rather than a fixed px height is what makes the
   * logo scale with the card instead of overflowing it on narrow cards —
   * combined with a shared `max-width` cap in Solutions.css so wide-aspect
   * wordmarks (VTCControl, REVOO) can't visually dominate their card.
   */
  logoHeightCqw: number;
  title: string;
  desc: string;
  ctaLabel: string;
}
