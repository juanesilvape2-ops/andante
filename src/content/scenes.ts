/**
 * Scene data for the scroll-scrub journey.
 * Single-shot: ONE entry whose `clip` is the continuous 15s film.
 * Keep this array a module constant — changing its identity on every render
 * rebuilds the ScrollScrub controller.
 */
import type { ScrollScrubScene, ScrollScrubTheme } from "@/components/scroll-scrub/ScrollScrub";

/** Brand tokens for the journey layer. From design-brief.md. */
export const scrollScrubTheme: ScrollScrubTheme = {
  accent: "#8FA8BE",
  background: "#07090C",
  ink: "#E8E6E1",
  muted: "#8A9299",
};

export const scrollScrubScenes: ScrollScrubScene[] = [
  {
    align: "left",
    body: "Fotografia documental y de moda en Bogota. La misma paciencia para una calle que para un set: espero a que la imagen aparezca en vez de apurarla.",
    clip: "/assets/world/scene-01.mp4",
    id: "scene-01",
    kicker: "Bogota, Colombia",
    label: "Revelado",
    linger: 0.18,
    mobileClip: "/assets/world/scene-01-mobile.mp4",
    mobilePoster: "/assets/world/scene-01-mobile-poster.png",
    poster: "/assets/world/scene-01-poster.png",
    scroll: 5,
    tags: ["Moda", "Documental", "Retrato"],
    title: "Cada imagen aparece despacio",
  },
];
