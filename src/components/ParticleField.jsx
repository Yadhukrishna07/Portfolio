import { useEffect, useRef, useState } from 'react';

/**
 * ParticleField — GPU-composited particle canvas with spatial-hash connections.
 *
 * Performance budget targets:
 *  • Desktop (≥1024px): 70 particles, full connections
 *  • Tablet (768–1023px): 35 particles, reduced connections
 *  • Mobile (<768px): component unmounts entirely (0 GPU cost)
 *
 * Key optimisations vs. the original:
 *  1. Spatial grid hashing turns O(n²) connection search into ~O(n)
 *  2. devicePixelRatio-aware sizing (capped at 2× to avoid 3×/4× overhead)
 *  3. RAF-guarded mousemove (one update per frame maximum)
 *  4. document.hidden check skips full frame when tab is backgrounded
 *  5. will-change: transform promotes canvas to its own compositor layer
 *  6. All listeners + RAF cleaned up on unmount
 */

/** Responsive particle count — returns 0 on mobile to skip rendering. */
function getParticleCount() {
  const w = window.innerWidth;
  if (w < 768) return 0;   // mobile — hide canvas entirely
  if (w < 1024) return 35; // tablet
  return 70;               // desktop
}

export default function ParticleField() {
  const canvasRef = useRef(null);
  const [visible, setVisible] = useState(() => getParticleCount() > 0);

  // Re-evaluate visibility on resize (mobile ↔ desktop transitions)
  useEffect(() => {
    const check = () => setVisible(getParticleCount() > 0);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Bail early on mobile — zero DOM cost
  if (!visible) return null;

  return <ParticleCanvas canvasRef={canvasRef} />;
}

// -------------------------------------------------------------------
// Inner canvas component — only mounts when particle count > 0
// -------------------------------------------------------------------
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // ---- constants ------------------------------------------------
    const CONNECTION_DISTANCE = 120;
    const MOUSE_RADIUS = 200;
    const HUES = [270, 185, 240, 330]; // purple / cyan / indigo / pink
    const TWO_PI = Math.PI * 2;

    let animationId = 0;
    let mouse = { x: -1000, y: -1000 };
    let mouseRAFPending = false; // RAF guard for mousemove

    // ---- DPR-aware resize -----------------------------------------
    /** Cap DPR at 2 — 3×/4× retina screens get diminishing returns */
    const getDPR = () => Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const dpr = getDPR();
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // ---- Particle class -------------------------------------------
    const canvasW = () => window.innerWidth;
    const canvasH = () => window.innerHeight;

    class Particle {
      constructor() {
        this.x = Math.random() * canvasW();
        this.y = Math.random() * canvasH();
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 0.5;
        this.baseAlpha = Math.random() * 0.5 + 0.1;
        this.alpha = this.baseAlpha;
        this.hue = HUES[(Math.random() * HUES.length) | 0];
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < MOUSE_RADIUS * MOUSE_RADIUS) {
          const dist = Math.sqrt(distSq);
          if (dist > 0) {
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
            this.vx += (dx / dist) * force * 0.02;
            this.vy += (dy / dist) * force * 0.02;
            this.alpha = this.baseAlpha + force * 0.5;
          }
        } else {
          this.alpha += (this.baseAlpha - this.alpha) * 0.02;
        }

        // Damping
        this.vx *= 0.99;
        this.vy *= 0.99;

        this.x += this.vx;
        this.y += this.vy;

        // Wrap around
        const w = canvasW();
        const h = canvasH();
        if (this.x < 0) this.x = w;
        else if (this.x > w) this.x = 0;
        if (this.y < 0) this.y = h;
        else if (this.y > h) this.y = 0;
      }

      draw() {
        // Core dot
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, TWO_PI);
        ctx.fillStyle = `hsla(${this.hue},80%,70%,${this.alpha})`;
        ctx.fill();

        // Glow halo
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 3, 0, TWO_PI);
        ctx.fillStyle = `hsla(${this.hue},80%,70%,${this.alpha * 0.15})`;
        ctx.fill();
      }
    }

    const particleCount = getParticleCount();
    const particles = Array.from({ length: particleCount }, () => new Particle());

    // ---- Spatial grid hashing for connection detection -------------
    /**
     * Divides the canvas into a grid of cells sized CONNECTION_DISTANCE.
     * Each particle is bucketed by (col, row). Connection search only
     * checks the 9 neighbouring cells → ~O(n) instead of O(n²).
     */
    const CELL = CONNECTION_DISTANCE;
    const CONN_DIST_SQ = CONNECTION_DISTANCE * CONNECTION_DISTANCE;

    function drawConnections() {
      const w = canvasW();
      const h = canvasH();
      const cols = Math.ceil(w / CELL) + 1;
      const rows = Math.ceil(h / CELL) + 1;

      // Build grid — flat Map keyed by (row * cols + col)
      /** @type {Map<number, number[]>} cell key → array of particle indices */
      const grid = new Map();

      for (let i = 0; i < particles.length; i++) {
        const col = (particles[i].x / CELL) | 0;
        const row = (particles[i].y / CELL) | 0;
        const key = row * cols + col;
        const bucket = grid.get(key);
        if (bucket) bucket.push(i);
        else grid.set(key, [i]);
      }

      // Batch stroke style — all connections share one colour base
      ctx.lineWidth = 0.5;

      // For each cell, check self + 4 forward neighbours (right, below-left,
      // below, below-right) to avoid drawing each pair twice.
      const offsets = [
        [0, 0], [1, 0], [-1, 1], [0, 1], [1, 1],
      ];

      for (const [cellKey, bucket] of grid) {
        const cellRow = (cellKey / cols) | 0;
        const cellCol = cellKey - cellRow * cols;

        for (const [dc, dr] of offsets) {
          const nc = cellCol + dc;
          const nr = cellRow + dr;
          if (nc < 0 || nc >= cols || nr < 0 || nr >= rows) continue;
          const neighborKey = nr * cols + nc;
          const neighborBucket = grid.get(neighborKey);
          if (!neighborBucket) continue;

          const isSelf = dc === 0 && dr === 0;

          for (let bi = 0; bi < bucket.length; bi++) {
            const pi = bucket[bi];
            const pa = particles[pi];
            // If checking same cell, only check j > i to avoid dupes
            const startJ = isSelf ? bi + 1 : 0;
            for (let bj = startJ; bj < neighborBucket.length; bj++) {
              const pj = neighborBucket[bj];
              const pb = particles[pj];
              const dx = pa.x - pb.x;
              const dy = pa.y - pb.y;
              const distSq = dx * dx + dy * dy;

              if (distSq < CONN_DIST_SQ) {
                const alpha = (1 - Math.sqrt(distSq) / CONNECTION_DISTANCE) * 0.15;
                ctx.beginPath();
                ctx.moveTo(pa.x, pa.y);
                ctx.lineTo(pb.x, pb.y);
                ctx.strokeStyle = `rgba(168,85,247,${alpha})`;
                ctx.stroke();
              }
            }
          }
        }
      }
    }

    // ---- Animation loop -------------------------------------------
    function animate() {
      animationId = requestAnimationFrame(animate);

      // Skip work entirely when tab is hidden — saves CPU/GPU
      if (document.hidden) return;

      const w = canvasW();
      const h = canvasH();
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      drawConnections();
    }

    animate();

    // ---- Mouse handler with RAF guard -----------------------------
    const handleMouse = (e) => {
      if (mouseRAFPending) return;
      mouseRAFPending = true;
      requestAnimationFrame(() => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouseRAFPending = false;
      });
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });

    // ---- Visibility change listener -------------------------------
    const handleVisibility = () => {
      if (!document.hidden) {
        // Reset mouse so particles don't snap on return
        mouse.x = -1000;
        mouse.y = -1000;
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // ---- Cleanup --------------------------------------------------
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        willChange: 'transform', // promote to compositor layer
      }}
    />
  );
}
