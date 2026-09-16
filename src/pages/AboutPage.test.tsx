import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router";

import { bio } from "@/content/bio";
import { categories } from "@/content/categories";

import { AboutPage } from "./AboutPage";

function renderAbout() {
  return render(<AboutPage />, { wrapper: MemoryRouter });
}

describe("AboutPage", () => {
  it("renders the kicker", () => {
    renderAbout();
    expect(screen.getByText(bio.kicker)).toBeInTheDocument();
  });

  it("renders all bio paragraphs", () => {
    renderAbout();
    for (const paragraph of bio.paragraphs) {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    }
  });

  it("renders the portrait image", () => {
    renderAbout();
    expect(screen.getByAltText("Esteban Silva")).toHaveAttribute(
      "src",
      "/assets/brand/profile.jpg",
    );
  });

  it("links each category to its gallery section anchor", () => {
    renderAbout();
    for (const category of categories) {
      const link = screen.getByRole("link", { name: new RegExp(category.label) });
      expect(link).toHaveAttribute("href", `/galeria#${category.id}`);
    }
  });
});
