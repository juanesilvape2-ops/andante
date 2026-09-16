import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteFooter } from "./SiteFooter";

const props = {
  email: "juanesilvape@gmail.com",
  instagram: { handle: "esteban__silvaa", url: "https://instagram.com/esteban__silvaa" },
  whatsapp: { display: "+57 311 531 1457", href: "tel:+573115311457" },
};

describe("SiteFooter", () => {
  it("links the email as a mailto:", () => {
    render(<SiteFooter {...props} />);
    const links = screen.getAllByRole("link", { name: props.email });
    for (const link of links) {
      expect(link).toHaveAttribute("href", `mailto:${props.email}`);
    }
  });

  it("links whatsapp as a tel:", () => {
    render(<SiteFooter {...props} />);
    expect(screen.getByRole("link", { name: props.whatsapp.display })).toHaveAttribute(
      "href",
      props.whatsapp.href,
    );
  });

  it("links instagram to the profile URL, opened in a new tab", () => {
    render(<SiteFooter {...props} />);
    const link = screen.getByRole("link", { name: `@${props.instagram.handle}` });
    expect(link).toHaveAttribute("href", props.instagram.url);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener");
  });

  it("renders the 'Abrir correo' bracket CTA", () => {
    render(<SiteFooter {...props} />);
    expect(screen.getByRole("link", { name: "Abrir correo" })).toHaveAttribute(
      "href",
      `mailto:${props.email}`,
    );
  });
});
