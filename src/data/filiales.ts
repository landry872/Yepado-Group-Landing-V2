import type { Filiale, Partner, Sector } from "../types";

export const sectors: Sector[] = [
  { id: "tech", name: "Technologie", color: "#00A3E0" },
  { id: "transport", name: "Transport", color: "#002E9E" },
  { id: "green", name: "Mobilité verte", color: "#0E9F6E" },
  { id: "services", name: "Services", color: "#3A3F4A" },
  { id: "fintech", name: "Fintech", color: "#00449E" },
  { id: "commerce", name: "Commerce", color: "#C2410C" },
];

export const filiales: Filiale[] = [
  {
    key: "psa",
    name: "PSA Technologie",
    sector: "tech",
    logo: "psa",
    lh: "40px",
    bandH: "28px",
    cta: "site",
    desc: "Bras technologique du groupe. Conception de logiciels SaaS, applications mobiles et systèmes digitaux pour les entreprises d'Afrique de l'Ouest. Héberge et développe VTCControl, la solution de référence pour la gestion de flottes.",
  },
  {
    key: "vtc",
    name: "VTCControl",
    sector: "tech",
    logo: "vtc",
    lh: "26px",
    bandH: "20px",
    cta: "site",
    tagline: "Développé par PSA Technologie",
    desc: "Solution SaaS complète de gestion de flotte. Dashboard temps réel, app mobile chauffeurs, analytics avancés. La référence pour taxis, VTC et livraisons.",
  },
  {
    key: "yfleet",
    name: "YFLEET Partner",
    sector: "transport",
    logo: "yfleet",
    lh: "40px",
    bandH: "34px",
    cta: "site",
    desc: "Location et gestion de flotte corporate. Solutions clé en main pour entreprises, administrations et institutions.",
  },
  {
    key: "urban",
    name: "Urban Drivers",
    sector: "transport",
    logo: "urban",
    lh: "38px",
    bandH: "33px",
    cta: "app",
    desc: "Service VTC premium avec chauffeurs professionnels formés. Transport haut de gamme à Abidjan et en Afrique de l'Ouest.",
  },
  {
    key: "revoo",
    name: "REVOO",
    sector: "green",
    logo: "revoo",
    lh: "26px",
    bandH: "12px",
    cta: "site",
    tagline: "Ride the future. Be the changer.",
    desc: "La marque de référence de la moto électrique en Côte d'Ivoire. Distribution à Abidjan, Koumassi, Cocody. En expansion au Sénégal.",
  },
  {
    key: "volteo",
    name: "Voltéo",
    sector: "green",
    logo: "volteo",
    lh: "40px",
    bandH: "27px",
    cta: "site",
    tagline: "Nos batteries, votre énergie.",
    desc: "Vélos, trottinettes et solutions de mobilité électrique complémentaires pour la ville de demain.",
  },
  {
    key: "service",
    name: "Yepado Service",
    sector: "services",
    logo: "yepado",
    lh: "30px",
    bandH: "27px",
    cta: "contact",
    desc: "Représentation commerciale de marques en Afrique de l'Ouest + imprimerie professionnelle.",
  },
  {
    key: "ewa",
    name: "EWA Track",
    sector: "services",
    logo: "ewa",
    lh: "30px",
    bandH: "22px",
    cta: "site",
    desc: "Solutions de géolocalisation GPS vous permettant de réduire vos coûts d'exploitation, d'améliorer la productivité de vos équipes et de sécuriser vos actifs en temps réel.",
  },
  {
    key: "ypay",
    name: "YpayWallet",
    sector: "fintech",
    logo: "ypaywallet",
    lh: "32px",
    bandH: "27px",
    cta: "app",
    desc: "Paiement digital pour l'écosystème Yepado et les marchands partenaires. Inclusion financière.",
  },
  {
    key: "commerce2",
    name: "Commerce 2.0",
    sector: "commerce",
    logo: "commerce2",
    lh: "30px",
    bandH: "24px",
    cta: "app",
    desc: "Application mobile pour les commerçants : gestion des ventes, des stocks et des paiements au quotidien.",
  },
];

export const partners: Partner[] = [
  { name: "LOLC Finance", logo: "/uploads/partner-lolc.svg" },
  { name: "inDrive", logo: "/uploads/partner-indrive.svg" },
  { name: "Yango", logo: "/uploads/partner-yango.svg" },
  { name: "SOCIDA", logo: "/uploads/partner-socida.svg" },
];

export function sectorOf(id: string): Sector {
  return sectors.find((s) => s.id === id) ?? sectors[0];
}

export function logoPath(logo: string, variant: "navy" | "color" | "white"): string {
  return `/logos/${logo}-${variant}.svg`;
}

export function ctaLabel(cta: Filiale["cta"]): string {
  return cta === "app" ? "Télécharger l'application" : "Visiter le site";
}
