import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Reveal } from "./Reveal";

describe("Reveal", () => {
  it("renders its children", () => {
    render(<Reveal>Hola</Reveal>);
    expect(screen.getByText("Hola")).toBeInTheDocument();
  });

  it("becomes visible once mounted (jsdom has no IntersectionObserver, so it falls back to visible)", () => {
    render(<Reveal>Hola</Reveal>);
    expect(screen.getByText("Hola")).toHaveClass("av-reveal", "av-reveal--visible");
  });

  it("renders as the given element tag", () => {
    render(<Reveal as="section">Hola</Reveal>);
    expect(screen.getByText("Hola").tagName).toBe("SECTION");
  });
});
