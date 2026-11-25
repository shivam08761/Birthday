import { useMemo } from "react";
import { HeartIcon } from "./Icons";

const COLORS = ["#e2336b", "#ff6b9a", "#c98a2b", "#a86ad6", "#ff8fab"];

export default function FloatingHearts({ count = 14 }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 9 + Math.random() * 16,
        delay: Math.random() * 18,
        duration: 15 + Math.random() * 18,
        drift: (Math.random() - 0.5) * 260,
        opacity: 0.22 + Math.random() * 0.3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotate: (Math.random() - 0.5) * 40,
      })),
    [count]
  );

  return (
    <div className="floating-hearts" aria-hidden="true">
      {hearts.map((heart) => (
        <HeartIcon
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            color: heart.color,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            "--o": heart.opacity,
            "--drift": `${heart.drift}px`,
            "--rot": `${heart.rotate}deg`,
          }}
        />
      ))}
    </div>
  );
}
