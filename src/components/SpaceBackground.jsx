import { useEffect, useRef } from "react";

const SpaceBackground = () => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Offscreen canvas for the static background (gradient + nebula)
    // Pre-rendered ONCE — not on every frame
    let bgCanvas = null;

    const buildStaticBackground = (w, h) => {
      bgCanvas = document.createElement("canvas");
      bgCanvas.width = w;
      bgCanvas.height = h;
      const bCtx = bgCanvas.getContext("2d");

      // Space gradient
      const gradient = bCtx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, "#000000");
      gradient.addColorStop(0.5, "#0a0a1a");
      gradient.addColorStop(1, "#000814");
      bCtx.fillStyle = gradient;
      bCtx.fillRect(0, 0, w, h);

      // Nebula — drawn once
      bCtx.save();
      bCtx.globalAlpha = 0.1;
      const nebula = bCtx.createRadialGradient(
        w * 0.3, h * 0.3, 0,
        w * 0.3, h * 0.3, w * 0.5
      );
      nebula.addColorStop(0, "rgba(88,28,135,0.3)");
      nebula.addColorStop(0.5, "rgba(59,130,246,0.2)");
      nebula.addColorStop(1, "rgba(0,0,0,0)");
      bCtx.fillStyle = nebula;
      bCtx.fillRect(0, 0, w, h);
      bCtx.restore();
    };

    // Stars — simple objects, no class overhead
    let stars = [];

    const initStars = (w, h) => {
      stars = [];
      const count = Math.min(Math.floor((w * h) / 10000), 120); // cap at 120
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: Math.random() * 1.5 + 0.3,
          speedY: Math.random() * 0.3 + 0.05,
          opacity: Math.random(),
          twinkleDir: Math.random() > 0.5 ? 1 : -1,
          twinkleSpeed: Math.random() * 0.008 + 0.004,
        });
      }
    };

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      buildStaticBackground(w, h);
      initStars(w, h);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Stamp the pre-rendered background (single drawImage — very fast)
      if (bgCanvas) ctx.drawImage(bgCanvas, 0, 0);

      // Draw stars — simple arc, no radial gradient
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Update
        s.y += s.speedY;
        if (s.y > h) { s.y = 0; s.x = Math.random() * w; }
        s.opacity += s.twinkleSpeed * s.twinkleDir;
        if (s.opacity > 1) { s.opacity = 1; s.twinkleDir = -1; }
        if (s.opacity < 0.2) { s.opacity = 0.2; s.twinkleDir = 1; }

        // Draw — just a filled circle, no gradient
        ctx.globalAlpha = s.opacity;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, 6.283); // 6.283 = Math.PI*2 pre-computed
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      bgCanvas = null;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

export default SpaceBackground;
