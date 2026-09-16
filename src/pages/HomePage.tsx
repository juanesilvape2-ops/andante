import { Link } from "react-router";

import { Reveal } from "@/components/reveal/Reveal";
import { ScrollScrub } from "@/components/scroll-scrub/ScrollScrub";
import { Statement } from "@/components/statement/Statement";
import type { Category, CategoryId } from "@/content/categories";
import { categories } from "@/content/categories";
import type { Photo } from "@/content/photos";
import { photos } from "@/content/photos";
import { scrollScrubScenes, scrollScrubTheme } from "@/content/scenes";
import { assetUrl } from "@/lib/asset-url";

/**
 * One hand-picked, representative frame per category — the mosaic's whole
 * point is real visual weight, so these are chosen shots, not the first
 * file in the folder.
 */
const featuredFiles: Record<CategoryId, string> = {
  comercial: "comercial/comercial_04.jpg",
  deportiva: "deportiva/deportiva_01.jpg",
  retratos: "retratos/retrato_08.jpg",
  street: "street/casual_11.jpg",
};

const mosaicTiles = categories
  .map((category) => {
    const photo = photos.find((candidate) => candidate.file === featuredFiles[category.id]);
    return photo ? { category, photo } : null;
  })
  .filter((tile): tile is { category: Category; photo: Photo } => tile !== null);

function MosaicTile({
  category,
  index,
  photo,
}: {
  category: Category;
  index: number;
  photo: Photo;
}) {
  return (
    <Reveal as="div" className={`av-mosaic-slot av-mosaic-slot--${category.id}`}>
      <Link className="av-mosaic-tile" to={`/galeria#${category.id}`}>
        <img
          alt={photo.note}
          height={photo.h}
          loading="lazy"
          src={assetUrl(`assets/work/${photo.file}`)}
          width={photo.w}
        />
        <span className="av-mosaic-caption">
          <span className="av-mosaic-index">{String(index + 1).padStart(2, "0")}</span>
          <span className="av-mosaic-label">{category.label}</span>
          <span className="av-mosaic-tagline">{category.tagline}</span>
        </span>
      </Link>
    </Reveal>
  );
}

export function HomePage() {
  return (
    <div className="av-page">
      <main id="top">
        <section className="av-hero-title">
          <div className="av-shell">
            <h1>Esteban Silva</h1>
            <p className="av-hero-role">Fotografo en Bogota</p>
          </div>
        </section>

        <ScrollScrub scenes={scrollScrubScenes} theme={scrollScrubTheme} />

        <section className="av-section" id="portafolio">
          <div className="av-shell">
            <Reveal as="header" className="av-sechead">
              <div>
                <span className="av-index">Portafolio</span>
                <h2>Cuatro categorias de trabajo</h2>
              </div>
              <p>Cada una tiene su propia galeria completa.</p>
            </Reveal>

            <div className="av-mosaic">
              {mosaicTiles.map((tile, index) => (
                <MosaicTile
                  category={tile.category}
                  index={index}
                  key={tile.category.id}
                  photo={tile.photo}
                />
              ))}
            </div>

            <Reveal>
              <Link className="av-cta-rule av-teaser-cta" to="/galeria">
                Ver la galeria completa
              </Link>
            </Reveal>
          </div>
        </section>

        <Reveal>
          <Statement>La misma pausa con la que miro una calle es la que llevo a un set.</Statement>
        </Reveal>
      </main>
    </div>
  );
}
