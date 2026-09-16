import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useInViewOnce } from "./useInViewOnce";

function Probe() {
  const { inView, ref } = useInViewOnce<HTMLDivElement>();
  return (
    <div data-testid="probe" ref={ref}>
      {inView ? "visible" : "hidden"}
    </div>
  );
}

describe("useInViewOnce", () => {
  it("falls back to visible when IntersectionObserver isn't available (jsdom has none by default)", () => {
    expect(typeof IntersectionObserver).toBe("undefined");
    render(<Probe />);
    expect(screen.getByTestId("probe")).toHaveTextContent("visible");
  });
});
