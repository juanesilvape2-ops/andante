/**
 * SEO / social-card metadata. Mirrors the original app-meta.json values.
 * Kept as typed constants (instead of duplicating strings straight into
 * index.html) so tests can assert the two never drift apart.
 */
export const siteMeta = {
  title: "Esteban Silva — Fotografia",
  description:
    "Fotografia de moda, retrato y documental en Bogota. La misma paciencia para una calle que para un set.",
  ogImageUrl: "/assets/brand/cover.png",
  faviconUrl: "/assets/brand/favicon.png",
} as const;
