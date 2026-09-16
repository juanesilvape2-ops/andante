import { useEffect, useRef } from "react";

import type { Photo } from "@/content/photos";
import { assetUrl } from "@/lib/asset-url";

export interface LightboxProps {
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  photos: Photo[];
}

/**
 * Enlarged single-photo view over a dimmed backdrop. Navigation is scoped to
 * whatever `photos` it's given — the caller (GalleryPage) passes the
 * currently-filtered set, so prev/next never leaks into other categories.
 */
export function Lightbox({ index, onClose, onNavigate, photos }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const photo = photos[index];
  const canNavigate = photos.length > 1;

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowRight" && canNavigate) {
        onNavigate((index + 1) % photos.length);
      } else if (event.key === "ArrowLeft" && canNavigate) {
        onNavigate((index - 1 + photos.length) % photos.length);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canNavigate, index, onClose, onNavigate, photos.length]);

  if (!photo) {
    return null;
  }

  return (
    <div className="av-lightbox" onClick={onClose} role="presentation">
      <div
        aria-label={photo.note}
        aria-modal="true"
        className="av-lightbox-dialog"
        onClick={(event) => event.stopPropagation()}
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
      >
        <button aria-label="Cerrar" className="av-lightbox-close" onClick={onClose} type="button">
          &#10005;
        </button>
        <button
          aria-label="Foto anterior"
          className="av-lightbox-prev"
          disabled={!canNavigate}
          onClick={() => onNavigate((index - 1 + photos.length) % photos.length)}
          type="button"
        >
          &#8249;
        </button>
        <figure className="av-lightbox-figure">
          <img alt={photo.note} src={assetUrl(`assets/work/${photo.file}`)} />
          <figcaption>{photo.note}</figcaption>
        </figure>
        <button
          aria-label="Foto siguiente"
          className="av-lightbox-next"
          disabled={!canNavigate}
          onClick={() => onNavigate((index + 1) % photos.length)}
          type="button"
        >
          &#8250;
        </button>
      </div>
    </div>
  );
}
