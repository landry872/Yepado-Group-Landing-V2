import type { Solution } from "../types";

/**
 * Static per the source design: this section is 7 hand-authored cards, not
 * a data-driven loop (confirmed — none of these fields are `{{ }}` bindings
 * in the original template).
 *
 * `logoHeightCqw` = the source design's fixed pixel height converted to a
 * percentage of its ~702px reference card width (px / 702 * 100), so it
 * scales with the card via `cqw` instead of overflowing narrower ones.
 */
export const solutions: Solution[] = [
  {
    key: "psa",
    name: "PSA Technologie",
    photo: "/uploads/solution-psa.png",
    logoWhite: "/logos/psa-white.svg",
    logoHeightCqw: 6.4,
    title: "Solutions technologiques et développement digital",
    desc: "PSA Technologie est spécialisée dans la conception, le développement et l'intégration de solutions technologiques innovantes destinées aux entreprises et aux acteurs de la mobilité.",
    ctaLabel: "Visiter le site",
  },
  {
    key: "yfleet",
    name: "YFLEET Partner",
    photo: "/uploads/solution-yfleet.png",
    logoWhite: "/logos/yfleet-white.svg",
    logoHeightCqw: 8.0,
    title: "Gestion et exploitation de flottes de véhicules",
    desc: "YFLEET Partner a pour objectif l'accompagnement des propriétaires et entreprises dans la gestion opérationnelle, administrative et financière de leurs flottes de véhicules.",
    ctaLabel: "Visiter le site",
  },
  {
    key: "vtc",
    name: "VTCControl",
    photo: "/uploads/solution-vtc.png",
    logoWhite: "/logos/vtc-white.svg",
    logoHeightCqw: 6.0,
    title: "Éditeur de solutions de gestion de flotte",
    desc: "VTCControl est une plateforme SaaS dédiée au suivi, au contrôle et à l'optimisation des performances des flottes de véhicules.",
    ctaLabel: "Visiter le site",
  },
  {
    key: "revoo",
    name: "REVOO",
    photo: "/uploads/solution-revoo.png",
    logoWhite: "/logos/revoo-white.svg",
    logoHeightCqw: 4.0,
    title: "Distribution de solutions de mobilité électrique",
    desc: "REVOO est une entreprise destinée à la commercialisation de motos électriques ainsi que de solutions de mobilité durable.",
    ctaLabel: "Visiter le site",
  },
  {
    key: "ewa",
    name: "EWA Track",
    photo: "/uploads/solution-ewa.png",
    logoWhite: "/logos/ewa-white.svg",
    logoHeightCqw: 5.8,
    title: "Plateforme de géolocalisation et de télématique",
    desc: "EWA Track propose des solutions de suivi GPS, de gestion de flotte et d'analyse des données de mobilité en temps réel.",
    ctaLabel: "Visiter le site",
  },
  {
    key: "service",
    name: "Yepado Service",
    photo: "/uploads/solution-yepado-service.png",
    logoWhite: "/logos/yepado-white.svg",
    logoHeightCqw: 5.4,
    title: "Représentation commerciale et développement d'affaires",
    desc: "Yepado Service accompagne des entreprises dans leur développement commercial, leur implantation locale, la représentation de marques et la prospection de marchés.",
    ctaLabel: "Visiter le site",
  },
  {
    key: "commerce2",
    name: "Commerce 2.0",
    photo: "/uploads/solution-commerce2.png",
    logoWhite: "/logos/commerce2-white.svg",
    logoHeightCqw: 5.0,
    title: "Une application pensée pour les commerçants",
    desc: "Commerce 2.0 digitalise la gestion quotidienne des commerçants : ventes, stocks et paiements, réunis dans une seule application mobile.",
    ctaLabel: "Découvrir l'app",
  },
];
