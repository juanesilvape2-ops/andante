import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ContactDetails } from "./ContactDetails";

const props = {
  email: "juanesilvape@gmail.com",
  instagram: { handle: "esteban__silvaa", url: "https://instagram.com/esteban__silvaa" },
  whatsapp: { display: "+57 311 531 1457", href: "tel:+573115311457" },
};

describe("ContactDetails", () => {
  it("links the email as a mailto:", () => {
    render(<ContactDetails {...props} />);
    expect(screen.getByRole("link", { name: props.email })).toHaveAttribute(
      "href",
      `mailto:${props.email}`,
    );
  });

  it("links whatsapp as a tel:", () => {
    render(<ContactDetails {...props} />);
    expect(screen.getByRole("link", { name: props.whatsapp.display })).toHaveAttribute(
      "href",
      props.whatsapp.href,
    );
  });

  it("links instagram to the profile URL, opened in a new tab", () => {
    render(<ContactDetails {...props} />);
    const link = screen.getByRole("link", { name: `@${props.instagram.handle}` });
    expect(link).toHaveAttribute("href", props.instagram.url);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener");
  });
});
