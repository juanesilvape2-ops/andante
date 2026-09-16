import type { ElementType, ReactNode } from "react";

import { useInViewOnce } from "@/hooks/useInViewOnce";

export interface RevealProps {
  children: ReactNode;
  /** Wrapper element tag — defaults to "div". */
  as?: ElementType;
  className?: string;
}

export function Reveal({ children, as: Tag = "div", className }: RevealProps) {
  const { inView, ref } = useInViewOnce<HTMLElement>();

  return (
    <Tag
      className={["av-reveal", inView ? "av-reveal--visible" : "", className]
        .filter(Boolean)
        .join(" ")}
      ref={ref}
    >
      {children}
    </Tag>
  );
}
