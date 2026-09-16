import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { contact } from "@/content/contact";

import { ContactPage } from "./ContactPage";

describe("ContactPage", () => {
  it("renders the intro copy", () => {
    render(<ContactPage />);
    expect(screen.getByText(contact.intro)).toBeInTheDocument();
  });

  it("renders the contact details", () => {
    render(<ContactPage />);
    expect(screen.getByRole("link", { name: contact.email })).toHaveAttribute(
      "href",
      `mailto:${contact.email}`,
    );
  });

  it("renders the bracket CTA", () => {
    render(<ContactPage />);
    expect(screen.getByRole("link", { name: "Abrir correo" })).toHaveAttribute(
      "href",
      `mailto:${contact.email}`,
    );
  });
});
