import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { Photo } from "@/content/photos";

import { PhotoGrid } from "./PhotoGrid";

const rows: Photo[][] = [
  [
    { category: "retratos", file: "a.jpg", h: 100, id: "a", note: "Shot A", w: 80 },
    { category: "retratos", file: "b.jpg", h: 100, id: "b", note: "Shot B", w: 80 },
  ],
  [{ category: "retratos", file: "c.jpg", h: 100, id: "c", note: "Shot C", w: 170 }],
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
