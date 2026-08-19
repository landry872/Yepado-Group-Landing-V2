export interface Chapter {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  rest: string;
  video: string;
  /** `object-position` for the video — full-bleed cover on a tall mobile
   * screen crops a landscape source left/right, so this is what actually
   * decides whether the subject's face stays in frame. Chosen by eye from
   * an extracted frame of each clip. */
  objectPosition: string;
}

export const chapters: Chapter[] = [
  {
    id: "chap-1",
    eyebrow: "Chapitre 01",
    title: "À propos de nous",
    lead: "Yepado Group est une holding technologique africaine fondée en 2022, développant un portefeuille de filiales dans la mobilité, la fintech, et la logistique.",
    rest: "Nous croyons que l'Afrique a besoin d'infrastructures technologiques adaptées.",
    video: "/uploads/about-1.mp4",
    objectPosition: "50% 35%",
  },
  {
    id: "chap-2",
    eyebrow: "Chapitre 02",
    title: "Mission & Vision",
    lead: "Construire les infrastructures technologiques invisibles qui font fonctionner l'Afrique de demain.",
    rest: "Et devenir le premier écosystème technologique pan-africain intégré d'ici 2030.",
    video: "/uploads/about-2-mission.mp4",
    objectPosition: "54% 32%",
  },
  {
    id: "chap-3",
    eyebrow: "Chapitre 03",
    title: "Ambition & Expansion",
    lead: "Opérer dans 15 pays africains, impacter",
    rest: "50M de vies et créer 10 000 emplois tech.",
    video: "/uploads/about-3-ambition.mp4",
    objectPosition: "42% 38%",
  },
];

export interface Chip {
  label: string;
  bg: string;
  /** Optional photo/flag path — rendered as a round image instead of the text label. */
  img?: string;
  /** Accessible label for the image (falls back to `label` if omitted). */
  imgAlt?: string;
}

export interface Metric {
  target: number;
  suffix?: string;
  pad?: boolean;
  label: string;
  ctx: string;
  chips: Chip[];
}

export const metrics: Metric[] = [
  {
    target: 8,
    pad: true,
    label: "Filiales",
    ctx: "Huit entités opérées par le groupe, de la technologie à la fintech.",
    chips: [
      { label: "PSA", bg: "#002E9E", img: "/uploads/chips/filiale-psa.webp", imgAlt: "PSA Technologie" },
      { label: "VTC", bg: "#00A3E0", img: "/uploads/chips/filiale-vtc.webp", imgAlt: "VTCControl" },
      { label: "YFLEET", bg: "#00449E", img: "/uploads/chips/filiale-yfleet.webp", imgAlt: "YFLEET Partner" },
      { label: "Urban", bg: "#0E9F6E", img: "/uploads/chips/filiale-urban.webp", imgAlt: "Urban Drivers" },
      { label: "+4", bg: "#002E9E" },
    ],
  },
  {
    target: 4,
    pad: true,
    label: "Secteurs",
    ctx: "Technologie · Transport · Mobilité verte · Fintech",
    chips: [
      { label: "Tech", bg: "#00A3E0", img: "/uploads/chips/secteur-tech.webp", imgAlt: "Technologie" },
      { label: "Transp", bg: "#002E9E", img: "/uploads/chips/secteur-transport.webp", imgAlt: "Transport" },
      { label: "Mob.", bg: "#0E9F6E", img: "/uploads/chips/secteur-mobilite-verte.webp", imgAlt: "Mobilité verte" },
      { label: "Fin", bg: "#00449E", img: "/uploads/chips/secteur-fintech.webp", imgAlt: "Fintech" },
    ],
  },
  {
    target: 5,
    pad: true,
    label: "Pays",
    ctx: "Côte d'Ivoire · Cameroun · Sénégal · RD Congo · Bénin",
    chips: [
      { label: "CI", bg: "#002E9E", img: "/flags/ci.png", imgAlt: "Côte d'Ivoire" },
      { label: "CM", bg: "#00A3E0", img: "/flags/cm.png", imgAlt: "Cameroun" },
      { label: "SN", bg: "#00449E", img: "/flags/sn.png", imgAlt: "Sénégal" },
      { label: "CD", bg: "#0E9F6E", img: "/flags/cd.png", imgAlt: "République démocratique du Congo" },
      { label: "BJ", bg: "#002E9E", img: "/flags/bj.png", imgAlt: "Bénin" },
    ],
  },
  {
    target: 10,
    suffix: "+",
    label: "Villes",
    ctx: "Une couverture urbaine en expansion continue.",
    chips: [
      { label: "Abidjan", bg: "#002E9E", img: "/uploads/chips/ville-abidjan.jpg", imgAlt: "Abidjan" },
      { label: "Dakar", bg: "#00A3E0", img: "/uploads/chips/ville-dakar.jpg", imgAlt: "Dakar" },
      { label: "Douala", bg: "#00449E", img: "/uploads/chips/ville-douala.jpg", imgAlt: "Douala" },
      { label: "Brazza", bg: "#0E9F6E", img: "/uploads/chips/ville-brazza.jpg", imgAlt: "Brazzaville" },
      { label: "+6", bg: "#002E9E", img: "/uploads/chips/ville-extra.jpg", imgAlt: "Autres villes" },
    ],
  },
];

export interface HeroVideo {
  src: string;
  poster?: string;
  label: string;
  /** `object-position` — see the same note on `Chapter`. */
  objectPosition: string;
}

export const heroVideos: HeroVideo[] = [
  {
    src: "/uploads/hero-1.mp4",
    poster: "/uploads/hero-poster.png",
    label: "Un dirigeant consulte son téléphone devant une flotte de véhicules Yepado",
    objectPosition: "52% 42%",
  },
  {
    src: "/uploads/hero-2-car-man.mp4",
    label: "Un client devant son véhicule",
    objectPosition: "45% 40%",
  },
  {
    src: "/uploads/hero-3-women-students.mp4",
    label: "Étudiantes utilisant les services Yepado",
    // The default center crop split the two women's faces in half on a tall
    // mobile screen — shifted right to keep the closer subject's face
    // fully in frame instead.
    objectPosition: "65% 42%",
  },
];
