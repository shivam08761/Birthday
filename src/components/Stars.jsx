import { useMemo } from "react";

export default function Stars({ count = 95 }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 0.6 + Math.random() * 2,
        delay: Math.random() * 7,
        duration: 2.4 + Math.random() * 4.5,
        opacity: 0.2 + Math.random() * 0.65,
      })),
    [count]
  );

  return (
    <div className="stars" aria-hidden="true">
      {stars.map((star) => (
        <span
          key={star.id}
          className="star"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            "--o": star.opacity,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
      <span className="shooting-star shoot-a" />
      <span className="shooting-star shoot-b" />
    </div>
  );
}
