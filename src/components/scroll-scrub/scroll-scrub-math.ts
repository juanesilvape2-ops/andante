import type { Segment, ScrollScrubConnector, ScrollScrubScene } from "./types";

export const clamp = (value: number, min = 0, max = 1): number =>
  Math.min(max, Math.max(min, value));

export const smoothstep = (value: number): number => {
  const x = clamp(value);
  return x * x * (3 - 2 * x);
};

export const lingerEase = (value: number, amount: number): number => {
  const x = clamp(value);
  const linger = clamp(amount, 0, 0.6);
  const centered = x - 0.5;
  return (1 - linger) * x + linger * (4 * centered ** 3 + 0.5);
};

export function buildSegments(
  scenes: ScrollScrubScene[],
  connectors: (ScrollScrubConnector | null)[],
): Segment[] {
  const result: Segment[] = [];

  for (const [index, scene] of scenes.entries()) {
    if (scene.mobileClip && !scene.mobilePoster) {
      throw new Error(`Scene ${scene.id} needs mobilePoster for mobileClip`);
    }
    result.push({
      clip: scene.clip,
      key: `scene:${scene.id}`,
      kind: "scene",
      linger: scene.linger ?? 0,
      mobileClip: scene.mobileClip,
      mobilePoster: scene.mobilePoster,
      mobileObjectPosition: scene.mobileObjectPosition ?? scene.objectPosition ?? "50% 50%",
      nextSectionIndex: index,
      objectPosition: scene.objectPosition ?? "50% 50%",
      poster: scene.poster,
      scene,
      sectionIndex: index,
      weight: scene.scroll ?? 1.4,
    });

    const connector = connectors[index];
    if (index < scenes.length - 1 && connector?.clip) {
      if (connector.mobileClip && !connector.mobilePoster) {
        throw new Error(`Connector after ${scene.id} needs mobilePoster for mobileClip`);
      }
      const nextScene = scenes[index + 1];
      result.push({
        clip: connector.clip,
        key: `connector:${scene.id}:${nextScene.id}`,
        kind: "connector",
        linger: 0,
        mobileClip: connector.mobileClip,
        mobilePoster: connector.mobilePoster,
        mobileObjectPosition:
          nextScene.mobileObjectPosition ?? nextScene.objectPosition ?? "50% 50%",
        nextSectionIndex: index + 1,
        objectPosition: nextScene.objectPosition ?? "50% 50%",
        poster: connector.poster,
        sectionIndex: index,
        weight: connector.scroll ?? 0.8,
      });
    }
  }

  return result;
}
