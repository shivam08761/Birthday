import { useEffect, useRef } from "react";

const COLORS = ["#e2336b", "#ff5c8d", "#c98a2b", "#a86ad6", "#ff2e72"];

export default function Fireworks({ trigger = 0, bursts = 5 }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const particlesRef = useRef([]);

  useEffect(() => {
    if (!trigger) return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const spawn = () => {
      for (let b = 0; b < bursts; b += 1) {
        const x = width * (0.16 + Math.random() * 0.68);
        const y = height * (0.12 + Math.random() * 0.42);
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        const total = 34 + Math.floor(Math.random() * 24);

        for (let i = 0; i < total; i += 1) {
          const angle = (Math.PI * 2 * i) / total + Math.random() * 0.1;
          const speed = 1.4 + Math.random() * 4.2;
          particlesRef.current.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1,
            decay: 0.008 + Math.random() * 0.012,
            color,
            size: 1.1 + Math.random() * 1.9,
          });
        }
      }
    };

    spawn();
    const second = window.setTimeout(spawn, 380);
    const third = window.setTimeout(spawn, 800);

    let last = performance.now();

    const tick = (now) => {
      const delta = Math.min((now - last) / 16.67, 3);
      last = now;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      particlesRef.current = particlesRef.current.filter(
        (particle) => particle.life > 0
      );

      for (const particle of particlesRef.current) {
        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;
        particle.vy += 0.045 * delta;
        particle.vx *= 0.992;
        particle.vy *= 0.992;
        particle.life -= particle.decay * delta;

        ctx.globalAlpha = Math.max(particle.life, 0);
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      if (particlesRef.current.length > 0) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.clearTimeout(second);
      window.clearTimeout(third);
      window.removeEventListener("resize", resize);
      particlesRef.current = [];
      ctx.clearRect(0, 0, width, height);
    };
  }, [trigger, bursts]);

  return <canvas ref={canvasRef} className="fireworks" aria-hidden="true" />;
}
