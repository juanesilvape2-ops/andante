import type { CSSProperties } from "react";

import type { Photo } from "@/content/photos";
import { assetUrl } from "@/lib/asset-url";

function Plate({ photo }: { photo: Photo }) {
  return (
    <figure className="av-plate" style={{ flexGrow: photo.w / photo.h } as CSSProperties}>
      <img
        alt={photo.note}
        height={photo.h}
        loading="lazy"
        src={assetUrl(`assets/work/${photo.file}`)}
        width={photo.w}
      />
      <figcaption>{photo.note}</figcaption>
    </figure>
  );
}

export interface PhotoGridProps {
  rows: Photo[][];
  /** Per-row inset class, e.g. "av-row--inset-right"; index-aligned with `rows`. */
  insets?: string[];
}

export function PhotoGrid({ rows, insets = [] }: PhotoGridProps) {
  return (
    <div className="av-rows">
      {rows.map((row, i) => (
        <div className={`av-row ${insets[i] ?? ""}`.trim()} key={row[0].id}>
          {row.map((photo) => (
            <Plate key={photo.id} photo={photo} />
          ))}
        </div>
      ))}
    </div>
  );
}
