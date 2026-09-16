import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router";

import { SiteNav } from "./SiteNav";

describe("SiteNav", () => {
  it("renders the wordmark", () => {
    render(<SiteNav />, { wrapper: MemoryRouter });
    expect(screen.getByText(/Esteban Silva/)).toBeInTheDocument();
  });

  it("links to the gallery and about pages", () => {
    render(<SiteNav />, { wrapper: MemoryRouter });
    expect(screen.getByRole("link", { name: "Galeria" })).toHaveAttribute("href", "/galeria");
    expect(screen.getByRole("link", { name: "Sobre mi" })).toHaveAttribute("href", "/sobre-mi");
  });

  it("links the CTA to the contact page", () => {
    render(<SiteNav />, { wrapper: MemoryRouter });
    expect(screen.getByRole("link", { name: "Escribeme" })).toHaveAttribute("href", "/contacto");
  });

  it("links the wordmark home", () => {
    render(<SiteNav />, { wrapper: MemoryRouter });
    expect(screen.getByRole("link", { name: /Esteban Silva/ })).toHaveAttribute("href", "/");
  });
});
