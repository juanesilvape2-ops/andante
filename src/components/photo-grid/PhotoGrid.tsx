import type { CSSProperties } from "react";

import type { Shot } from "@/content/photos";

function Plate({ shot }: { shot: Shot }) {
  return (
    <figure className="av-plate" style={{ flexGrow: shot.ratio } as CSSProperties}>
      <img
        alt={shot.note}
        height={shot.h}
        loading="lazy"
        src={`/assets/work/${shot.file}`}
        width={shot.w}
      />
      <figcaption>{shot.note}</figcaption>
    </figure>
  );
}

export interface PhotoGridProps {
  rows: Shot[][];
  /** Per-row inset class, e.g. "av-row--inset-right"; index-aligned with `rows`. */
  insets?: string[];
}

export function PhotoGrid({ rows, insets = [] }: PhotoGridProps) {
  return (
    <div className="av-rows">
      {rows.map((row, i) => (
        <div className={`av-row ${insets[i] ?? ""}`.trim()} key={row[0].file}>
          {row.map((shot) => (
            <Plate key={shot.file} shot={shot} />
          ))}
        </div>
      ))}
    </div>
  );
}
