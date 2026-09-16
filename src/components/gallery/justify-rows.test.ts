import { describe, expect, it } from "vitest";

import type { Photo } from "@/content/photos";

import { justifyRows } from "./justify-rows";

const photo = (id: string, w: number, h: number): Photo => ({
  category: "retratos",
  file: `${id}.jpg`,
  h,
  id,
  note: id,
  w,
});

const flatten = (rows: Photo[][]): Photo[] => rows.flat();

describe("justifyRows", () => {
  it("returns no rows for an empty photo list", () => {
    expect(justifyRows([])).toEqual([]);
  });

  it("puts a single photo in its own row", () => {
    const solo = photo("a", 1080, 1350);
    expect(justifyRows([solo])).toEqual([[solo]]);
  });

  it("puts a single extremely wide photo alone in its own row", () => {
    const wide = photo("wide", 4000, 800); // ratio 5, already over the default target
    expect(justifyRows([wide])).toEqual([[wide]]);
  });

  it("groups landscape photos until the row's ratio sum reaches the target", () => {
    // ratio 1.5 each; target 3.6 -> closes after the 3rd (1.5*3 = 4.5 >= 3.6)
    const shots = ["a", "b", "c", "d", "e", "f"].map((id) => photo(id, 1500, 1000));
    const rows = justifyRows(shots);

    expect(rows).toHaveLength(2);
    expect(rows[0]).toHaveLength(3);
    expect(rows[1]).toHaveLength(3);
  });

  it("caps a row at maxPerRow even if the ratio target hasn't been reached", () => {
    // ratio 0.5 (narrow portrait) each; 10 photos would need 8 to hit the
    // default target of 3.6, so the maxPerRow=5 cap should kick in first.
    const shots = Array.from({ length: 10 }, (_, i) => photo(`p${i}`, 500, 1000));
    const rows = justifyRows(shots);

    expect(rows).toHaveLength(2);
    expect(rows[0]).toHaveLength(5);
    expect(rows[1]).toHaveLength(5);
  });

  it("handles a mixed set of aspect ratios without dropping or duplicating photos", () => {
    const shots = [
      photo("portrait-1", 1080, 1350),
      photo("landscape-1", 2000, 1125),
      photo("portrait-2", 1080, 1350),
      photo("square", 1200, 1200),
      photo("landscape-2", 2000, 1125),
      photo("portrait-3", 1080, 1350),
      photo("landscape-3", 2000, 1125),
    ];
    const rows = justifyRows(shots);

    expect(flatten(rows)).toEqual(shots);
    expect(rows.every((row) => row.length > 0)).toBe(true);
  });

  it("preserves input order across rows", () => {
    const shots = Array.from({ length: 13 }, (_, i) => photo(`s${i}`, 1000 + i * 37, 1000));
    const rows = justifyRows(shots);
    expect(flatten(rows)).toEqual(shots);
  });

  it("respects a custom targetRatio", () => {
    const shots = ["a", "b", "c"].map((id) => photo(id, 1500, 1000)); // ratio 1.5 each
    const rows = justifyRows(shots, 1); // every photo alone exceeds a target of 1

    expect(rows).toEqual([[shots[0]], [shots[1]], [shots[2]]]);
  });

  it("respects a custom maxPerRow", () => {
    const shots = Array.from({ length: 6 }, (_, i) => photo(`n${i}`, 500, 1000)); // ratio 0.5
    const rows = justifyRows(shots, DEFAULT_TARGET_RATIO_FOR_TEST, 2);

    expect(rows).toHaveLength(3);
    expect(rows.every((row) => row.length === 2)).toBe(true);
  });
});

// kept separate from the module's own default so the "custom maxPerRow" test
// above documents intent rather than relying on the production constant.
const DEFAULT_TARGET_RATIO_FOR_TEST = 3.6;
