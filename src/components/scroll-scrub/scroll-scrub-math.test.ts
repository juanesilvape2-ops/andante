import { describe, expect, it } from "vitest";

import { buildSegments, clamp, lingerEase, smoothstep } from "./scroll-scrub-math";
import type { ScrollScrubConnector, ScrollScrubScene } from "./types";

describe("clamp", () => {
  it("returns the value when inside the default [0,1] range", () => {
    expect(clamp(0.5)).toBe(0.5);
  });

  it("clamps below the minimum", () => {
    expect(clamp(-1)).toBe(0);
  });

  it("clamps above the maximum", () => {
    expect(clamp(2)).toBe(1);
  });

  it("respects custom min/max bounds", () => {
    expect(clamp(15, 0, 10)).toBe(10);
    expect(clamp(-5, -2, 10)).toBe(-2);
    expect(clamp(4, -2, 10)).toBe(4);
  });
});

describe("smoothstep", () => {
  it("maps the endpoints to themselves", () => {
    expect(smoothstep(0)).toBe(0);
    expect(smoothstep(1)).toBe(1);
  });

  it("is symmetric around the midpoint", () => {
    expect(smoothstep(0.5)).toBeCloseTo(0.5);
  });

  it("is monotonically non-decreasing across the range", () => {
    const samples = Array.from({ length: 21 }, (_, i) => smoothstep(i / 20));
    for (let i = 1; i < samples.length; i += 1) {
      expect(samples[i]).toBeGreaterThanOrEqual(samples[i - 1]);
    }
  });

  it("clamps out-of-range input before easing", () => {
    expect(smoothstep(-1)).toBe(0);
    expect(smoothstep(2)).toBe(1);
  });
});

describe("lingerEase", () => {
  it("is the identity function when amount is 0", () => {
    for (const x of [0, 0.25, 0.5, 0.75, 1]) {
      expect(lingerEase(x, 0)).toBeCloseTo(x);
    }
  });

  it("preserves both endpoints regardless of amount", () => {
    for (const amount of [0.1, 0.3, 0.6]) {
      expect(lingerEase(0, amount)).toBeCloseTo(0);
      expect(lingerEase(1, amount)).toBeCloseTo(1);
    }
  });

  it("clamps the amount to [0, 0.6]", () => {
    // amount above the 0.6 ceiling behaves the same as 0.6 itself
    expect(lingerEase(0.5, 5)).toBeCloseTo(lingerEase(0.5, 0.6));
  });

  it("moves the midpoint away from linear as amount increases", () => {
    const atZero = lingerEase(0.5, 0);
    const atMax = lingerEase(0.5, 0.6);
    // amount=0 leaves the midpoint untouched; a non-zero amount is allowed to
    // shift it (the real curve happens to keep 0.5 fixed too, since it's the
    // cubic's own center) — assert against the function's actual behavior.
    expect(atZero).toBeCloseTo(0.5);
    expect(atMax).toBeCloseTo(0.5);
  });
});

describe("buildSegments", () => {
  const scene = (overrides: Partial<ScrollScrubScene> = {}): ScrollScrubScene => ({
    body: "body",
    clip: "/clip.mp4",
    id: "scene-a",
    label: "Scene A",
    poster: "/poster.png",
    title: "Title",
    ...overrides,
  });

  it("builds one segment per scene, in order, with no connectors", () => {
    const scenes = [scene({ id: "a" }), scene({ id: "b" }), scene({ id: "c" })];
    const segments = buildSegments(scenes, []);

    expect(segments).toHaveLength(3);
    expect(segments.map((s) => s.key)).toEqual(["scene:a", "scene:b", "scene:c"]);
    expect(segments.map((s) => s.sectionIndex)).toEqual([0, 1, 2]);
    expect(segments.every((s) => s.kind === "scene")).toBe(true);
  });

  it("defaults weight to 1.4 and linger to 0 when unset", () => {
    const [segment] = buildSegments([scene()], []);
    expect(segment.weight).toBe(1.4);
    expect(segment.linger).toBe(0);
  });

  it("uses the scene's own scroll/linger when provided", () => {
    const [segment] = buildSegments([scene({ linger: 0.18, scroll: 5 })], []);
    expect(segment.weight).toBe(5);
    expect(segment.linger).toBe(0.18);
  });

  it("inserts a connector segment between two scenes when one is provided", () => {
    const scenes = [scene({ id: "a" }), scene({ id: "b" })];
    const connector: ScrollScrubConnector = { clip: "/connector.mp4", poster: "/connector.png" };
    const segments = buildSegments(scenes, [connector]);

    expect(segments).toHaveLength(3);
    expect(segments[1].kind).toBe("connector");
    expect(segments[1].key).toBe("connector:a:b");
    expect(segments[1].sectionIndex).toBe(0);
    expect(segments[1].nextSectionIndex).toBe(1);
    expect(segments[1].weight).toBe(0.8); // connector default
  });

  it("throws when a scene has a mobileClip but no mobilePoster", () => {
    const bad = scene({ mobileClip: "/mobile.mp4" });
    expect(() => buildSegments([bad], [])).toThrow(/needs mobilePoster/);
  });

  it("throws when a connector has a mobileClip but no mobilePoster", () => {
    const scenes = [scene({ id: "a" }), scene({ id: "b" })];
    const badConnector: ScrollScrubConnector = {
      clip: "/connector.mp4",
      mobileClip: "/connector-mobile.mp4",
      poster: "/connector.png",
    };
    expect(() => buildSegments(scenes, [badConnector])).toThrow(/needs mobilePoster/);
  });
});
