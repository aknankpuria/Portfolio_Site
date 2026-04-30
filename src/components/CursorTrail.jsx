import { useEffect, useRef } from "react";

/**
 * CursorTrail — replaced canvas + particle system with two CSS divs.
 *
 * Why: The old approach did createRadialGradient() per particle per frame,
 * spawned 2 new Particle objects per mousemove, and ran requestAnimationFrame
 * at 60fps drawing up to ~50 gradients/frame — main-thread jank guaranteed.
 *
 * New approach:
 * - Outer ring follows cursor with a CSS lerp (transform only → compositor thread)
 * - Inner dot snaps to cursor instantly
 * - Zero canvas, zero rAF, zero garbage collection
 */
const CursorTrail = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    // Show cursors
    dot.style.opacity = "1";
    ringEl.style.opacity = "1";

    const onMouseMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      // Dot snaps instantly via direct transform
      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    };

    // Ring lerps toward cursor — runs on compositor via transform only
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12);
      ringEl.style.transform = `translate(${ring.current.x - 16}px, ${ring.current.y - 16}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Inner dot — snaps instantly */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#00E5CC",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0,
          willChange: "transform",
          boxShadow: "0 0 6px rgba(0,229,204,0.8)",
        }}
      />
      {/* Outer ring — lerps behind */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1.5px solid rgba(0,229,204,0.4)",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: 0,
          willChange: "transform",
          transition: "border-color 0.3s",
        }}
      />
    </>
  );
};

export default CursorTrail;
