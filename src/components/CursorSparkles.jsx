import { useEffect } from "react";

export default function CursorSparkles() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    let last = 0;

    const onMove = (event) => {
      const now = performance.now();
      if (now - last < 55) return;
      last = now;

      const sparkle = document.createElement("span");
      const size = 4 + Math.random() * 7;
      sparkle.className = "cursor-sparkle";
      sparkle.style.left = `${event.clientX + (Math.random() * 20 - 10)}px`;
      sparkle.style.top = `${event.clientY + (Math.random() * 20 - 10)}px`;
      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;
      sparkle.style.setProperty("--dx", `${(Math.random() - 0.5) * 44}px`);
      sparkle.style.setProperty("--dy", `${(Math.random() - 0.5) * 44}px`);
      document.body.appendChild(sparkle);
      sparkle.addEventListener("animationend", () => sparkle.remove(), {
        once: true,
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      document
        .querySelectorAll(".cursor-sparkle")
        .forEach((node) => node.remove());
    };
  }, []);

  return null;
}
