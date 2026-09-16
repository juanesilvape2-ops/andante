import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router";

import { Footer } from "./Footer";

describe("Footer", () => {
  it("links to the contact page", () => {
    render(<Footer />, { wrapper: MemoryRouter });
    expect(screen.getByRole("link", { name: "Escribeme" })).toHaveAttribute("href", "/contacto");
  });

  it("links to instagram, opened in a new tab", () => {
    render(<Footer />, { wrapper: MemoryRouter });
    const link = screen.getByRole("link", { name: "@esteban__silvaa" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener");
  });

  it("renders the colophon", () => {
    render(<Footer />, { wrapper: MemoryRouter });
    expect(screen.getByText("Esteban Silva, fotografia. Bogota, Colombia.")).toBeInTheDocument();
  });
});
