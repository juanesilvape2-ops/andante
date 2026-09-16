import type { CSSProperties, ReactNode } from "react";

export interface ScrollScrubScene {
  id: string;
  label: string;
  /** Exact first frame of the deployed desktop clip. */
  poster: string;
  /** Exact first frame of mobileClip; provide whenever mobileClip is set. */
  mobilePoster?: string;
  clip: string;
  mobileClip?: string;
  title: string;
  body: string;
  kicker?: string;
  tags?: string[];
  actions?: ReactNode;
  align?: "left" | "right";
  /** Viewport-heights assigned to this scene. More distance means slower scrub. */
  scroll?: number;
  /** 0..0.6. Slow the middle of the clip without changing either seam frame. */
  linger?: number;
  objectPosition?: string;
  mobileObjectPosition?: string;
}

export interface ScrollScrubConnector {
  /** Exact first frame of this connector clip; never substitute a scene still. */
  poster: string;
  /** Exact first frame of mobileClip; provide whenever mobileClip is set. */
  mobilePoster?: string;
  clip: string;
  mobileClip?: string;
  scroll?: number;
}

export interface ScrollScrubTheme {
  background: string;
  ink: string;
  muted: string;
  accent: string;
}

export interface ScrollScrubProps {
  scenes: ScrollScrubScene[];
  /** Leave empty for continuous-forward architecture A. */
  connectors?: (ScrollScrubConnector | null)[];
  theme: ScrollScrubTheme;
  className?: string;
  onActiveSectionChange?: (index: number) => void;
}

export interface Segment {
  key: string;
  kind: "scene" | "connector";
  sectionIndex: number;
  nextSectionIndex: number;
  poster: string;
  mobilePoster?: string;
  clip: string;
  mobileClip?: string;
  weight: number;
  linger: number;
  objectPosition: string;
  mobileObjectPosition: string;
  scene?: ScrollScrubScene;
}

export interface RuntimeSegment extends Segment {
  band: HTMLElement;
  layer: HTMLElement;
  start: number;
  end: number;
  current: number;
  target: number;
  visible: boolean;
  loading: boolean;
  ready: boolean;
  failed: boolean;
  loadedSource?: string;
  video?: HTMLVideoElement;
  objectUrl?: string;
  abort?: AbortController;
}

export interface Controller {
  jumpToSection: (index: number) => void;
}

export type ThemeStyle = CSSProperties & Record<`--ss-${string}`, string | number>;
