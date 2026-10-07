import { useEffect, useRef, useState } from "react";

let motionQuery = null;

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  if (!motionQuery) {
    motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  }
  return motionQuery.matches;
}

/**
 * Reveals an element once it scrolls into the viewport.
 * - Triggers only once (does not replay on re-entry).
 * - Immediately "visible" when the user prefers reduced motion.
 */
export default function useScrollReveal({
  threshold = 0.18,
  rootMargin = "0px 0px -10% 0px",
} = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (prefersReducedMotion()) {
      setVisible(true);
      return undefined;
    }

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, visible];
}