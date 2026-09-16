import type { Photo } from "@/content/photos";

/**
 * Justified-gallery row packing: greedily accumulates photos — by their
 * native aspect ratio (w / h) — into a row until the row's ratio sum reaches
 * `targetRatio`, then starts a new row. This mirrors how PhotoGrid renders a
 * row: each plate's flex-grow is its own aspect ratio, so a row whose ratios
 * sum near the target fills the shell width evenly, without cropping.
 *
 * `maxPerRow` guards against a long run of narrow (portrait) photos padding
 * out a single, overcrowded row before the ratio sum catches up.
 *
 * This is deliberately simple — a single greedy pass, no backtracking or
 * width-solving — which is enough for a gallery that just needs sensible,
 * automatic rows for an arbitrary, unpredictable set of photos.
 */
const DEFAULT_TARGET_RATIO = 3.6;
const DEFAULT_MAX_PER_ROW = 5;

export function justifyRows(
  photos: Photo[],
  targetRatio: number = DEFAULT_TARGET_RATIO,
  maxPerRow: number = DEFAULT_MAX_PER_ROW,
): Photo[][] {
  const rows: Photo[][] = [];
  let row: Photo[] = [];
  let ratioSum = 0;

  for (const photo of photos) {
    row.push(photo);
    ratioSum += photo.w / photo.h;

    if (ratioSum >= targetRatio || row.length >= maxPerRow) {
      rows.push(row);
      row = [];
      ratioSum = 0;
    }
  }

  if (row.length > 0) {
    rows.push(row);
  }

  return rows;
}
