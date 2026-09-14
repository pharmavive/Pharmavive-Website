'use client';

import React, { useEffect, useRef } from 'react';

/**
 * HeroMoleculesAnimation
 * Highly visible, elegant scientific background animation featuring:
 * 1. Floating structured chemical molecules (benzene rings, fused bicyclic rings, branched carbon backbones)
 *    with slow rotations and chemical bonds.
 * 2. Dynamic atomic constellation network with distance-based covalent bonds.
 * 3. Refined scientific palette (deep navy #0E2358, signature brand teal #08A698, and cool slate #64748B)
 *    with crisp, clear contrast against the white/sterile background.
 */
export default function HeroMoleculesAnimation() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = 0;
    let height = 0;
    let isVisible = true;

    // Scientific color palette with clear, beautiful visibility
    const colors = {
      navy: 'rgba(14, 35, 88, ',       // Primary dark navy
      teal: 'rgba(8, 166, 152, ',      // Pharmavive brand teal
      slate: 'rgba(100, 116, 139, ',   // Slate neutral
      accent: 'rgba(13, 148, 136, ',   // Deep emerald
    };

    let particles = [];
    let complexMolecules = [];

    // --- 1. Structured Chemical Molecule Class ---
    class ChemicalMolecule {
      constructor(type) {
        this.type = type; // 'benzene', 'bicyclic', 'branched', 'tetrahedral'
        this.reset();
        // Scatter initially across canvas
        this.x = Math.random() * (width || 1200);
        this.y = Math.random() * (height || 600);
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.angle = Math.random() * Math.PI * 2;
        this.vRot = (Math.random() - 0.5) * 0.005; // Gentle rotation
        this.scale = Math.random() * 0.3 + 0.85; // 0.85x - 1.15x
        this.baseAlpha = Math.random() * 0.2 + 0.45; // 0.45 - 0.65 visibility!
        this.pulse = Math.random() * Math.PI;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.angle += this.vRot;
        this.pulse += this.pulseSpeed;

        // Wrap around borders smoothly with margin
        const margin = 120;
        if (this.x < -margin) this.x = width + margin;
        if (this.x > width + margin) this.x = -margin;
        if (this.y < -margin) this.y = height + margin;
        if (this.y > height + margin) this.y = -margin;
      }

      draw() {
        const alpha = this.baseAlpha + Math.sin(this.pulse) * 0.08;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.scale(this.scale, this.scale);

        if (this.type === 'benzene') {
          this.drawBenzene(alpha);
        } else if (this.type === 'bicyclic') {
          this.drawBicyclic(alpha);
        } else if (this.type === 'branched') {
          this.drawBranched(alpha);
        } else {
          this.drawTetrahedral(alpha);
        }

        ctx.restore();
      }

      drawBenzene(alpha) {
        const r = 32;
        const points = [];
        for (let i = 0; i < 6; i++) {
          const a = (i * Math.PI) / 3;
          points.push({ x: Math.cos(a) * r, y: Math.sin(a) * r });
        }

        // Draw hexagon outer ring bonds
        ctx.beginPath();
        ctx.strokeStyle = `${colors.slate}${alpha * 0.75})`;
        ctx.lineWidth = 1.4;
        for (let i = 0; i < 6; i++) {
          const p1 = points[i];
          const p2 = points[(i + 1) % 6];
          if (i === 0) ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        }
        ctx.closePath();
        ctx.stroke();

        // Alternating inner double bonds
        const innerR = r * 0.78;
        for (let i = 0; i < 6; i += 2) {
          const a1 = (i * Math.PI) / 3 + 0.12;
          const a2 = ((i + 1) * Math.PI) / 3 - 0.12;
          ctx.beginPath();
          ctx.strokeStyle = `${colors.teal}${alpha * 0.85})`;
          ctx.lineWidth = 1.2;
          ctx.moveTo(Math.cos(a1) * innerR, Math.sin(a1) * innerR);
          ctx.lineTo(Math.cos(a2) * innerR, Math.sin(a2) * innerR);
          ctx.stroke();
        }

        // External functional group branches (2 opposite arms)
        ctx.beginPath();
        ctx.strokeStyle = `${colors.slate}${alpha * 0.7})`;
        ctx.lineWidth = 1.4;
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(points[0].x + 18, points[0].y);
        ctx.moveTo(points[3].x, points[3].y);
        ctx.lineTo(points[3].x - 18, points[3].y);
        ctx.stroke();

        // Terminal atom nodes
        this.drawAtom(points[0].x + 18, points[0].y, 3.5, colors.teal, alpha);
        this.drawAtom(points[3].x - 18, points[3].y, 3.5, colors.navy, alpha);

        // Ring vertices atoms
        points.forEach((p, idx) => {
          const col = idx % 2 === 0 ? colors.teal : colors.navy;
          this.drawAtom(p.x, p.y, 3.8, col, alpha);
        });
      }

      drawBicyclic(alpha) {
        // Fused 6-membered and 5-membered ring (e.g. Indole / Purine core)
        const r = 26;
        const hex = [];
        for (let i = 0; i < 6; i++) {
          const a = (i * Math.PI) / 3;
          hex.push({ x: Math.cos(a) * r - 12, y: Math.sin(a) * r });
        }

        // Draw 6-member ring
        ctx.beginPath();
        ctx.strokeStyle = `${colors.slate}${alpha * 0.75})`;
        ctx.lineWidth = 1.4;
        for (let i = 0; i < 6; i++) {
          const p1 = hex[i];
          const p2 = hex[(i + 1) % 6];
          if (i === 0) ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        }
        ctx.closePath();
        ctx.stroke();

        // 5-member ring apex attached to hex[0] and hex[1]
        const apex1 = { x: hex[0].x + 22, y: hex[0].y - 8 };
        const apex2 = { x: hex[1].x + 24, y: hex[1].y + 10 };

        ctx.beginPath();
        ctx.strokeStyle = `${colors.slate}${alpha * 0.75})`;
        ctx.lineWidth = 1.4;
        ctx.moveTo(hex[0].x, hex[0].y);
        ctx.lineTo(apex1.x, apex1.y);
        ctx.lineTo(apex2.x, apex2.y);
        ctx.lineTo(hex[1].x, hex[1].y);
        ctx.stroke();

        // Draw atoms
        hex.forEach((p, idx) => {
          this.drawAtom(p.x, p.y, 3.5, idx % 2 === 0 ? colors.navy : colors.teal, alpha);
        });
        this.drawAtom(apex1.x, apex1.y, 4.2, colors.teal, alpha, true); // heteroatom with halo
        this.drawAtom(apex2.x, apex2.y, 3.5, colors.navy, alpha);
      }

      drawBranched(alpha) {
        // Zigzag hydrocarbon / peptide backbone
        const pts = [
          { x: -38, y: -12 },
          { x: -18, y: 14 },
          { x: 4, y: -12 },
          { x: 26, y: 14 },
          { x: 46, y: -6 },
        ];

        ctx.beginPath();
        ctx.strokeStyle = `${colors.slate}${alpha * 0.75})`;
        ctx.lineWidth = 1.4;
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) {
          ctx.lineTo(pts[i].x, pts[i].y);
        }
        ctx.stroke();

        // Carbonyl / functional branch on pts[2]
        ctx.beginPath();
        ctx.strokeStyle = `${colors.teal}${alpha * 0.85})`;
        ctx.lineWidth = 1.3;
        // Double bond representation
        ctx.moveTo(pts[2].x - 2, pts[2].y);
        ctx.lineTo(pts[2].x - 2, pts[2].y - 22);
        ctx.moveTo(pts[2].x + 2, pts[2].y);
        ctx.lineTo(pts[2].x + 2, pts[2].y - 22);
        ctx.stroke();

        this.drawAtom(pts[2].x, pts[2].y - 22, 4.5, colors.teal, alpha, true);

        pts.forEach((p, idx) => {
          this.drawAtom(p.x, p.y, 3.6, idx % 2 === 0 ? colors.navy : colors.slate, alpha);
        });
      }

      drawTetrahedral(alpha) {
        // Central atom with 3 satellite arms (amino / methyl / phosphorus hub)
        const center = { x: 0, y: 0 };
        const arms = [
          { x: Math.cos(-Math.PI / 2) * 28, y: Math.sin(-Math.PI / 2) * 28 },
          { x: Math.cos(Math.PI / 6) * 28, y: Math.sin(Math.PI / 6) * 28 },
          { x: Math.cos((5 * Math.PI) / 6) * 28, y: Math.sin((5 * Math.PI) / 6) * 28 },
        ];

        ctx.beginPath();
        ctx.strokeStyle = `${colors.slate}${alpha * 0.75})`;
        ctx.lineWidth = 1.4;
        arms.forEach((arm) => {
          ctx.moveTo(center.x, center.y);
          ctx.lineTo(arm.x, arm.y);
        });
        ctx.stroke();

        this.drawAtom(center.x, center.y, 5.0, colors.teal, alpha, true);
        arms.forEach((arm, i) => {
          this.drawAtom(arm.x, arm.y, 3.6, i % 2 === 0 ? colors.navy : colors.teal, alpha);
        });
      }

      drawAtom(x, y, r, colorPrefix, alpha, hasHalo = false) {
        // Subtle outer atomic orbital shell
        if (hasHalo) {
          ctx.beginPath();
          ctx.arc(x, y, r + 4, 0, Math.PI * 2);
          ctx.strokeStyle = `${colorPrefix}${alpha * 0.35})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        // Solid atom core
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `${colorPrefix}${alpha})`;
        ctx.fill();

        // Crisp inner specular highlight
        ctx.beginPath();
        ctx.arc(x - r * 0.3, y - r * 0.3, r * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
        ctx.fill();
      }
    }

    // --- 2. Floating Atomic Node (Constellation Network) ---
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        const isProminent = Math.random() < 0.2;
        this.isProminent = isProminent;
        this.radius = isProminent ? Math.random() * 1.5 + 3.5 : Math.random() * 1.2 + 2.0;
        this.colorPrefix =
          Math.random() < 0.45
            ? colors.teal
            : Math.random() < 0.75
            ? colors.navy
            : colors.slate;
        this.baseAlpha = Math.random() * 0.25 + 0.45; // 0.45 - 0.70 visibility!
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulseVal = Math.random() * Math.PI;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x - this.radius < 0) {
          this.x = this.radius;
          this.vx = -this.vx;
        } else if (this.x + this.radius > width) {
          this.x = width - this.radius;
          this.vx = -this.vx;
        }

        if (this.y - this.radius < 0) {
          this.y = this.radius;
          this.vy = -this.vy;
        } else if (this.y + this.radius > height) {
          this.y = height - this.radius;
          this.vy = -this.vy;
        }

        this.pulseVal += this.pulseSpeed;
      }

      draw() {
        const currentAlpha = this.baseAlpha + Math.sin(this.pulseVal) * 0.12;

        if (this.isProminent) {
          const haloRadius = this.radius + 4 + Math.sin(this.pulseVal) * 1.5;
          ctx.beginPath();
          ctx.arc(this.x, this.y, haloRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `${this.colorPrefix}${currentAlpha * 0.35})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.fillStyle = `${this.colorPrefix}${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // Crisp white specular spot on atomic nodes
        if (this.radius > 2.8) {
          ctx.beginPath();
          ctx.arc(this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.32, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.75})`;
          ctx.fill();
        }
      }
    }

    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // Sizing particle counts for clear visual density & 60fps performance
      const particleCount = width < 640 ? 35 : width < 1024 ? 50 : 68;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }

      // Complex chemical compounds (benzene rings, indoles, branched chains)
      const moleculeCount = width < 640 ? 3 : width < 1024 ? 4 : 6;
      const types = ['benzene', 'bicyclic', 'branched', 'tetrahedral', 'benzene', 'bicyclic'];
      complexMolecules = [];
      for (let i = 0; i < moleculeCount; i++) {
        complexMolecules.push(new ChemicalMolecule(types[i % types.length]));
      }
    };

    // Draw dynamic covalent bond lines between nearby atoms
    function connectParticles() {
      const maxDistance = width < 640 ? 110 : 135;
      const maxDistSq = maxDistance * maxDistance;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            // Clearly visible opacity: 0.15 - 0.45
            const factor = 1 - dist / maxDistance;
            const opacity = factor * 0.42;

            ctx.beginPath();
            // Alternate subtle teal and slate bonds
            const strokeColor = (i + j) % 3 === 0 ? colors.teal : colors.slate;
            ctx.strokeStyle = `${strokeColor}${opacity})`;
            ctx.lineWidth = Math.max(0.7, factor * 1.3);
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw dynamic atomic bond connections first
      connectParticles();

      // 2. Update and draw atomic particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      // 3. Update and draw structured chemical molecules (benzene rings, bicyclic structures)
      for (let i = 0; i < complexMolecules.length; i++) {
        complexMolecules[i].update();
        complexMolecules[i].draw();
      }

      animId = requestAnimationFrame(animate);
    }

    // Pause when hero is not visible in viewport to prevent GPU load
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (!wasVisible && isVisible) {
          animId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
    >
      {/* Subtle clean scientific dot matrix background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(rgba(148, 163, 184, 0.22) 1.2px, transparent 1.2px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* High-visibility Molecular Science Canvas Animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
