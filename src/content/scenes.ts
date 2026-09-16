/**
 * Scene data for the scroll-scrub journey.
 * Single-shot: ONE entry whose `clip` is the continuous 15s film.
 * Keep this array a module constant — changing its identity on every render
 * rebuilds the ScrollScrub controller.
 */
import type { ScrollScrubScene, ScrollScrubTheme } from "@/components/scroll-scrub/ScrollScrub";
import { assetUrl } from "@/lib/asset-url";

/** Brand tokens for the journey layer — resolved from styles/tokens.css. */
export const scrollScrubTheme: ScrollScrubTheme = {
  accent: "var(--av-selenium)",
  background: "var(--av-base)",
  ink: "var(--av-ink)",
  muted: "var(--av-muted)",
};

export const scrollScrubScenes: ScrollScrubScene[] = [
  {
    align: "left",
    body: "Retrato, calle, deportiva y trabajo comercial en Bogota. Sesiones planeadas y momentos que no se repiten, con la misma atencion en ambos.",
    clip: assetUrl("assets/world/scene-01.mp4"),
    id: "scene-01",
    kicker: "Bogota, Colombia",
    label: "Portafolio",
    linger: 0.18,
    mobileClip: assetUrl("assets/world/scene-01-mobile.mp4"),
    mobilePoster: assetUrl("assets/world/scene-01-mobile-poster.png"),
    poster: assetUrl("assets/world/scene-01-poster.png"),
    scroll: 2.2,
    tags: ["Retrato", "Documental", "Comercial"],
    title: "Fotografia en Bogota",
  },
];
