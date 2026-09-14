'use client';

import { useState, useEffect } from 'react';

/**
 * High-performance smooth counter animation hook with ease-out curve.
 * Automatically respects `prefers-reduced-motion`.
 *
 * @param {number} targetValue - The numeric target value to count up to.
 * @param {boolean} [shouldStart=true] - Trigger condition (e.g. when element is revealed in viewport).
 * @param {number} [duration=1200] - Duration of animation in milliseconds.
 * @returns {number} Current animated value.
 */
export function useCounterAnimation(targetValue, shouldStart = true, duration = 1200) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(targetValue);
      return;
    }

    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutCubic curve: 1 - (1 - progress)^3
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * targetValue));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(targetValue);
      }
    };

    const animId = window.requestAnimationFrame(step);

    return () => window.cancelAnimationFrame(animId);
  }, [targetValue, shouldStart, duration]);

  return count;
}
