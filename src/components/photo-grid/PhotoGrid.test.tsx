import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { Shot } from "@/content/photos";

import { PhotoGrid } from "./PhotoGrid";

const rows: Shot[][] = [
  [
    { file: "a.jpg", h: 100, note: "Shot A", ratio: 0.8, w: 80 },
    { file: "b.jpg", h: 100, note: "Shot B", ratio: 0.8, w: 80 },
  ],
  [{ file: "c.jpg", h: 100, note: "Shot C", ratio: 1.7, w: 170 }],
];

describe("PhotoGrid", () => {
  it("renders one figure/img per shot, across all rows", () => {
    render(<PhotoGrid rows={rows} />);
    expect(screen.getAllByRole("img")).toHaveLength(3);
  });

  it("sets alt/src/width/height from the shot data", () => {
    render(<PhotoGrid rows={rows} />);
    const img = screen.getByAltText("Shot A") as HTMLImageElement;
    expect(img.src).toContain("/assets/work/a.jpg");
    expect(img.width).toBe(80);
    expect(img.height).toBe(100);
  });

  it("renders the caption text", () => {
    render(<PhotoGrid rows={rows} />);
    expect(screen.getByText("Shot C")).toBeInTheDocument();
  });

  it("applies the inset class for the given row index only", () => {
    const { container } = render(<PhotoGrid insets={["", "av-row--inset-right"]} rows={rows} />);
    const rowEls = container.querySelectorAll(".av-row");
    expect(rowEls[0]).not.toHaveClass("av-row--inset-right");
    expect(rowEls[1]).toHaveClass("av-row--inset-right");
  });
});
