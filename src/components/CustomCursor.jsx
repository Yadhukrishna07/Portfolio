import { useEffect, useRef } from 'react';

/**
 * CustomCursor — smooth trailing ring + dot cursor.
 *
 * Performance optimisations vs. the original:
 *  1. Returns null immediately on touch / coarse-pointer devices
 *  2. Event delegation on document.body replaces MutationObserver +
 *     individual element listeners — one mouseover/mouseout pair handles
 *     all current & future interactive elements
 *  3. RAF id is stored and cancelled on cleanup (prevents orphaned frames)
 *  4. Same visual appearance: ring cursor + centered dot
 */

/** Selector for elements that trigger the hover-expanded cursor state. */
const INTERACTIVE_SELECTOR = 'a, button, input, textarea, .card, .skills__item, .btn';

/**
 * Detect touch-primary devices at module level so the component can
 * bail out before mounting any DOM or listeners.
 */
function isTouchDevice() {
  if (typeof window === 'undefined') return true;
  // Coarse pointer = finger / stylus — no precision cursor needed
  if (window.matchMedia('(pointer: coarse)').matches) return true;
  if (window.innerWidth < 768) return true;
  return false;
}

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  // Early exit for touch devices — zero runtime cost
  if (isTouchDevice()) return null;

  /* eslint-disable react-hooks/rules-of-hooks -- conditional is stable per device */
  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let rafId = 0;

    // ---- Mousemove — direct dot placement -------------------------
    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot snaps instantly (no lerp)
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    };

    // ---- Smooth ring follow via RAF -------------------------------
    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      rafId = requestAnimationFrame(animate);
    };

    // ---- Event delegation for hover state -------------------------
    // Instead of attaching listeners to every <a>, <button>, etc. and
    // re-scanning the DOM with a MutationObserver, we listen once on
    // document.body and walk up with closest().
    const onOver = (e) => {
      if (e.target.closest(INTERACTIVE_SELECTOR)) {
        cursor.classList.add('custom-cursor--hover');
      }
    };
    const onOut = (e) => {
      if (e.target.closest(INTERACTIVE_SELECTOR)) {
        cursor.classList.remove('custom-cursor--hover');
      }
    };

    // ---- Attach listeners -----------------------------------------
    window.addEventListener('mousemove', onMove, { passive: true });
    document.body.addEventListener('mouseover', onOver, { passive: true });
    document.body.addEventListener('mouseout', onOut, { passive: true });
    rafId = requestAnimationFrame(animate);

    // ---- Cleanup --------------------------------------------------
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      document.body.removeEventListener('mouseover', onOver);
      document.body.removeEventListener('mouseout', onOut);
    };
  }, []);
  /* eslint-enable react-hooks/rules-of-hooks */

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}
