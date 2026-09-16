import "@testing-library/jest-dom/vitest";

// jsdom does not implement matchMedia; the ScrollScrub engine reads it
// directly (prefers-reduced-motion, coarse pointer, small-viewport checks).
if (!window.matchMedia) {
  window.matchMedia = (query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
}
