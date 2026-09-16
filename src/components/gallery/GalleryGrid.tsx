import type { CSSProperties, MouseEvent } from "react";

import type { Photo } from "@/content/photos";
import { assetUrl } from "@/lib/asset-url";

import { justifyRows } from "./justify-rows";

interface GalleryPlateProps {
  onSelect: (photo: Photo, event: MouseEvent<HTMLButtonElement>) => void;
  photo: Photo;
}

function GalleryPlate({ onSelect, photo }: GalleryPlateProps) {
  return (
    <figure className="av-plate" style={{ flexGrow: photo.w / photo.h } as CSSProperties}>
      <button
        aria-label={`Ver en grande: ${photo.note}`}
        className="av-plate-trigger"
        onClick={(event) => onSelect(photo, event)}
        type="button"
      >
        <img
          alt={photo.note}
          height={photo.h}
          loading="lazy"
          src={assetUrl(`assets/work/${photo.file}`)}
          width={photo.w}
        />
      </button>
      <figcaption>{photo.note}</figcaption>
    </figure>
  );
}

export interface GalleryGridProps {
  onSelect: (photo: Photo, event: MouseEvent<HTMLButtonElement>) => void;
  photos: Photo[];
}

/**
 * Reuses PhotoGrid's `.av-rows` / `.av-row` / `.av-plate` layout (from
 * photo-grid.css) so the gallery matches the home teaser exactly, but each
 * plate is a real button (PhotoGrid's isn't) so a click can open the
 * lightbox — and rows are grouped automatically via `justifyRows` instead of
 * hand-picked, since the full catalog is too large (and too variable) to
 * curate by hand.
 */
export function GalleryGrid({ onSelect, photos }: GalleryGridProps) {
  if (photos.length === 0) {
    return null;
  }

  const rows = justifyRows(photos);

  return (
    <div className="av-rows">
      {rows.map((row) => (
        <div className="av-row" key={row[0].id}>
          {row.map((photo) => (
            <GalleryPlate key={photo.id} onSelect={onSelect} photo={photo} />
          ))}
        </div>
      ))}
    </div>
  );
}
