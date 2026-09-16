import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ScrollScrub } from "./ScrollScrub";
import type { ScrollScrubScene, ScrollScrubTheme } from "./types";

const theme: ScrollScrubTheme = {
  accent: "#8FA8BE",
  background: "#07090C",
  ink: "#E8E6E1",
  muted: "#8A9299",
};

const scenes: ScrollScrubScene[] = [
  {
    body: "Body copy",
    clip: "/assets/world/scene-01.mp4",
    id: "scene-01",
    kicker: "Kicker",
    label: "Revelado",
    poster: "/assets/world/scene-01-poster.png",
    scroll: 5,
    tags: ["Moda", "Documental"],
    title: "Cada imagen aparece despacio",
  },
];

describe("ScrollScrub", () => {
  it("renders without throwing when scene/segment markup stays in sync", () => {
    expect(() => render(<ScrollScrub scenes={scenes} theme={theme} />)).not.toThrow();
  });

  it("renders one chapter-nav button per scene, labeled with the scene label", () => {
    render(<ScrollScrub scenes={scenes} theme={theme} />);
    expect(screen.getByRole("button", { name: "Revelado" })).toBeInTheDocument();
  });

  it("renders the scene title and body", () => {
    render(<ScrollScrub scenes={scenes} theme={theme} />);
    expect(screen.getByText("Cada imagen aparece despacio")).toBeInTheDocument();
    expect(screen.getByText("Body copy")).toBeInTheDocument();
  });

  it("applies the theme as CSS custom properties on the root element", () => {
    const { container } = render(<ScrollScrub scenes={scenes} theme={theme} />);
    const root = container.querySelector(".scroll-scrub") as HTMLElement;
    expect(root.style.getPropertyValue("--ss-accent")).toBe(theme.accent);
    expect(root.style.getPropertyValue("--ss-bg")).toBe(theme.background);
    expect(root.style.getPropertyValue("--ss-ink")).toBe(theme.ink);
    expect(root.style.getPropertyValue("--ss-muted")).toBe(theme.muted);
  });

  it("renders nothing when there are no scenes", () => {
    const { container } = render(<ScrollScrub scenes={[]} theme={theme} />);
    expect(container).toBeEmptyDOMElement();
  });
});
