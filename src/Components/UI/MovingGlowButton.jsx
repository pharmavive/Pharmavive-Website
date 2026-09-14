'use client';

import React from 'react';
import Link from 'next/link';

/**
 * MovingGlowButton
 * Renders a high-tech button or link with a continuous moving luminous glow line
 * traveling around the perimeter border, matching user reference image media_1789063862652.png.
 *
 * @param {string} href - Optional destination URL (renders as Next.js Link)
 * @param {string} variant - 'teal' (matches reference image) or 'dark' (navy-teal brand)
 * @param {string} className - Additional CSS classes for outer container
 * @param {string} innerClassName - Additional CSS classes for inner content surface
 */
export default function MovingGlowButton({
  children,
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  innerClassName = '',
  variant = 'teal',
  ...props
}) {
  const innerVariantClass =
    variant === 'dark' ? 'moving-glow-inner' : 'moving-glow-inner-teal';

  const content = (
    <>
      {/* 1. Luminous Rotating Glow Beam (Sharp Core) */}
      <span className="moving-glow-beam" aria-hidden="true" />

      {/* 2. Ambient Bloom Layer (Soft Diffusion Aura) */}
      <span className="moving-glow-beam-bloom" aria-hidden="true" />

      {/* 3. Inner Interactive Surface */}
      <span
        className={`${innerVariantClass} px-5 py-2.5 text-xs sm:text-sm select-none ${innerClassName}`}
      >
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`moving-glow-btn ${className}`}
        onClick={onClick}
        {...props}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`moving-glow-btn ${disabled ? 'opacity-70 cursor-not-allowed' : ''} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
}
