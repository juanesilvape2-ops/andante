import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router";

import { categories } from "@/content/categories";
import { photosByCategory } from "@/content/photos";

import { GalleryPage } from "./GalleryPage";

function renderGallery(initialPath = "/galeria") {
  return render(<GalleryPage />, {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={[initialPath]}>{children}</MemoryRouter>
    ),
  });
}

describe("GalleryPage sections", () => {
  it("renders every category as its own always-visible section with the right photo count", () => {
    renderGallery();

    for (const category of categories) {
      const heading = screen.getByRole("heading", { name: category.label });
      const section = heading.closest("section");
      expect(section).not.toBeNull();
      expect(within(section as HTMLElement).getAllByRole("img")).toHaveLength(
        photosByCategory(category.id).length,
      );
    }
  });

  it("shows each section's tagline", () => {
    renderGallery();

    for (const category of categories) {
      expect(screen.getByText(category.tagline)).toBeInTheDocument();
    }
  });

  it("gives each section an id matching its CategoryId, for cross-page #hash links", () => {
    renderGallery();

    for (const category of categories) {
      const heading = screen.getByRole("heading", { name: category.label });
      expect(heading.closest("section")).toHaveAttribute("id", category.id);
    }
  });

  it("has a quick-nav with a link to every section anchor", () => {
    renderGallery();

    const nav = screen.getByRole("navigation", { name: "Ir a una seccion" });
    for (const category of categories) {
      const link = within(nav).getByRole("link", { name: category.label });
      expect(link).toHaveAttribute("href", `#${category.id}`);
    }
  });
});

describe("GalleryPage lightbox", () => {
  it("opens on photo click, as a dialog showing that section's caption", () => {
    renderGallery();
    const [photo] = photosByCategory("deportiva");
    fireEvent.click(screen.getByRole("button", { name: `Ver en grande: ${photo.note}` }));

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAccessibleName(photo.note);
  });

  it("closes on Escape", () => {
    renderGallery();
    const [photo] = photosByCategory("retratos");
    fireEvent.click(screen.getByRole("button", { name: `Ver en grande: ${photo.note}` }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes on backdrop click but not on a click inside the dialog", () => {
    const { container } = renderGallery();
    const [photo] = photosByCategory("retratos");
    fireEvent.click(screen.getByRole("button", { name: `Ver en grande: ${photo.note}` }));

    fireEvent.click(screen.getByRole("dialog"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    const backdrop = container.querySelector(".av-lightbox");
    expect(backdrop).not.toBeNull();
    fireEvent.click(backdrop as Element);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("next/prev cycle through only the clicked section's photos", () => {
    renderGallery();
    const streetPhotos = photosByCategory("street");
    fireEvent.click(screen.getByRole("button", { name: `Ver en grande: ${streetPhotos[0].note}` }));

    const next = screen.getByRole("button", { name: "Foto siguiente" });
    const seenCaptions: string[] = [];
    for (let i = 0; i < streetPhotos.length; i += 1) {
      seenCaptions.push(screen.getByRole("dialog").getAttribute("aria-label") ?? "");
      fireEvent.click(next);
    }

    // every street photo, cycled through exactly once, nothing from another section
    expect(new Set(seenCaptions)).toEqual(new Set(streetPhotos.map((photo) => photo.note)));
    // after a full cycle we're back at the photo we opened
    expect(screen.getByRole("dialog")).toHaveAccessibleName(streetPhotos[0].note);
  });

  it("wraps to the last photo in the section on prev from the first", () => {
    renderGallery();
    const comercialPhotos = photosByCategory("comercial");
    fireEvent.click(
      screen.getByRole("button", { name: `Ver en grande: ${comercialPhotos[0].note}` }),
    );

    fireEvent.click(screen.getByRole("button", { name: "Foto anterior" }));
    expect(screen.getByRole("dialog")).toHaveAccessibleName(
      comercialPhotos[comercialPhotos.length - 1].note,
    );
  });

  it("disables prev/next for a section with a single photo", () => {
    renderGallery();
    const [photo] = photosByCategory("deportiva");
    fireEvent.click(screen.getByRole("button", { name: `Ver en grande: ${photo.note}` }));

    expect(screen.getByRole("button", { name: "Foto anterior" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Foto siguiente" })).toBeDisabled();
  });
});

describe("GalleryPage hash-anchor scroll", () => {
  const originalScrollIntoView = Element.prototype.scrollIntoView;

  beforeEach(() => {
    Element.prototype.scrollIntoView = vi.fn();
  });

  afterEach(() => {
    Element.prototype.scrollIntoView = originalScrollIntoView;
  });

  it("scrolls the matching section into view when arriving at /galeria#deportiva", () => {
    renderGallery("/galeria#deportiva");

    const heading = screen.getByRole("heading", { name: "Deportiva" });
    const section = heading.closest("section") as HTMLElement;
    expect(section.scrollIntoView).toHaveBeenCalled();
  });

  it("does not scroll anything when there is no hash", () => {
    renderGallery("/galeria");
    expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled();
  });

  it("ignores a hash that doesn't match any category", () => {
    renderGallery("/galeria#no-existe");
    expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled();
  });
});
