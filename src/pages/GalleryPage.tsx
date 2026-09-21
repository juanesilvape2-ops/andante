import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";

import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Lightbox } from "@/components/gallery/Lightbox";
import type { CategoryId } from "@/content/categories";
import { categories } from "@/content/categories";
import type { Photo } from "@/content/photos";
import { photosByCategory } from "@/content/photos";

interface LightboxState {
  category: CategoryId;
  index: number;
}

/**
 * Every category renders as its own always-visible section (no more
 * tab-filtering — the client didn't want to hunt through a filter to find a
 * section). The quick-nav below the title is additive: an in-page table of
 * contents for someone who already knows which section they want.
 *
 * Cross-page anchor contract: each section's id is the bare CategoryId
 * (matches `categories.ts` exactly), and a link to `/galeria#retratos`
 * lands on that section on mount via the hash-scroll effect below.
 */
export function GalleryPage() {
  const location = useLocation();
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const sectionRefs = useRef<Partial<Record<CategoryId, HTMLElement | null>>>({});

  useEffect(() => {
    const targetId = location.hash.replace("#", "");
    const target = categories.find((category) => category.id === targetId);
    const section = target ? sectionRefs.current[target.id] : null;
    if (!section) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }, [location.hash]);

  function openLightbox(category: CategoryId, photo: Photo, event: MouseEvent<HTMLButtonElement>) {
    triggerRef.current = event.currentTarget;
    const sectionPhotos = photosByCategory(category);
    const index = sectionPhotos.findIndex((candidate) => candidate.id === photo.id);
    setLightbox({ category, index });
  }

  function closeLightbox() {
    setLightbox(null);
    triggerRef.current?.focus();
    triggerRef.current = null;
  }

  const lightboxPhotos = lightbox ? photosByCategory(lightbox.category) : [];

  return (
    <div className="av-page">
      <main className="av-shell av-page-main" id="top">
        <span className="av-index">Galeria</span>
        <h1>Portafolio completo</h1>

        <nav aria-label="Ir a una seccion" className="av-gallery-quicknav">
          {categories.map((category) => (
            <a className="av-gallery-quicknav-link" href={`#${category.id}`} key={category.id}>
              {category.label}
            </a>
          ))}
        </nav>

        {categories.map((category) => {
          const sectionPhotos = photosByCategory(category.id);

          return (
            <section
              className="av-gallery-section"
              id={category.id}
              key={category.id}
              ref={(node) => {
                sectionRefs.current[category.id] = node;
              }}
            >
              <div className="av-sechead">
                <h2>{category.label}</h2>
                <p>{category.tagline}</p>
              </div>

              <div className="av-gallery">
                {sectionPhotos.length > 0 ? (
                  <GalleryGrid
                    onSelect={(photo, event) => openLightbox(category.id, photo, event)}
                    photos={sectionPhotos}
                  />
                ) : (
                  <p className="av-gallery-empty">Proximamente.</p>
                )}
              </div>
            </section>
          );
        })}
      </main>

      {lightbox ? (
        <Lightbox
          index={lightbox.index}
          onClose={closeLightbox}
          onNavigate={(index) => setLightbox((current) => (current ? { ...current, index } : current))}
          photos={lightboxPhotos}
        />
      ) : null}
    </div>
  );
}
