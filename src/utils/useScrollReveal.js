'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Lightweight, zero-dependency IntersectionObserver hook for high-performance scroll reveals.
 * Automatically respects `prefers-reduced-motion` and disconnects once revealed.
 * Supports both `const ref = useScrollReveal()` and `const { ref, isRevealed } = useScrollReveal()`.
 *
 * @param {Object} options
 * @param {number} [options.threshold=0.1]
 * @param {string} [options.rootMargin='50px 0px']
 * @returns {import('react').RefObject} ref to attach to the animated element or container
 */
export function useScrollReveal({ threshold = 0.1, rootMargin = '50px 0px' } = {}) {
  const elementRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const reveal = () => {
      setIsRevealed(true);
      el.classList.add('revealed');
      const targets = el.querySelectorAll('.scroll-reveal');
      targets.forEach((t) => t.classList.add('revealed'));
    };

    // 1. Accessibility Check: If user prefers reduced motion, reveal immediately
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveal();
      return;
    }

    // 2. Immediate In-Viewport Check (avoids delay for elements already above or near fold)
    if (typeof window !== 'undefined') {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 100 && rect.bottom > -100) {
        reveal();
        return;
      }
    }

    // 3. Setup IntersectionObserver for elements scrolled into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  // Safely attach convenience properties if the ref object is extensible (React 18 vs React 19)
  try {
    if (elementRef && Object.isExtensible(elementRef)) {
      elementRef.ref = elementRef;
      elementRef.isRevealed = isRevealed;
    }
  } catch {
    // In React 19, ref objects are sealed/non-extensible in development
  }

  return elementRef;
}
