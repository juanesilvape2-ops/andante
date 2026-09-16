import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router";

import { categories } from "@/content/categories";

import { HomePage } from "./HomePage";

function renderHome() {
  return render(<HomePage />, { wrapper: MemoryRouter });
}

describe("HomePage", () => {
  it("renders one mosaic tile per category, linking to its gallery anchor", () => {
    renderHome();
    for (const category of categories) {
      const link = screen.getByRole("link", { name: new RegExp(category.label) });
      expect(link).toHaveAttribute("href", `/galeria#${category.id}`);
    }
  });

  it("renders exactly one tile per category, no more", () => {
    renderHome();
    expect(screen.getAllByAltText(/./)).toHaveLength(categories.length);
  });

  it("links to the full gallery", () => {
    renderHome();
    expect(screen.getByRole("link", { name: "Ver la galeria completa" })).toHaveAttribute(
      "href",
      "/galeria",
    );
  });

  it("renders the closing statement", () => {
    renderHome();
    expect(
      screen.getByText("La misma pausa con la que miro una calle es la que llevo a un set."),
    ).toBeInTheDocument();
  });
});
