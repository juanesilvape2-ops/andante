import { useEffect, useRef, useState } from "react";

/**
 * True once the element has scrolled into view, and stays true after that
 * (a one-shot reveal trigger, not a visibility tracker). Starts `true`
 * immediately when IntersectionObserver isn't available, so content is never
 * stuck hidden in an unsupported environment. `prefers-reduced-motion` is
 * handled separately in CSS (see styles/reveal.css) so there's no flash
 * before this effect runs.
 */
export function useInViewOnce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(() => typeof IntersectionObserver === "undefined");

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return { inView, ref };
}
