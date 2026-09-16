import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteNav } from "./SiteNav";

describe("SiteNav", () => {
  it("renders the wordmark", () => {
    render(<SiteNav />);
    expect(screen.getByText(/Esteban Silva/)).toBeInTheDocument();
    expect(screen.getByText(/Andante/)).toBeInTheDocument();
  });

  it("links Moda and Calle to their section anchors", () => {
    render(<SiteNav />);
    expect(screen.getByRole("link", { name: "Moda" })).toHaveAttribute("href", "#moda");
    expect(screen.getByRole("link", { name: "Calle" })).toHaveAttribute("href", "#calle");
  });

  it("links the CTA to the contact anchor", () => {
    render(<SiteNav />);
    expect(screen.getByRole("link", { name: "Escribeme" })).toHaveAttribute("href", "#contacto");
  });
});
