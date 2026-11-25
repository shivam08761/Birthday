import { useMemo } from "react";

export default function Petals({ count = 16 }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 7 + Math.random() * 9,
        delay: Math.random() * 16,
        duration: 14 + Math.random() * 18,
        drift: (Math.random() - 0.5) * 220,
        opacity: 0.18 + Math.random() * 0.32,
      })),
    [count]
  );

  return (
    <div className="petals" aria-hidden="true">
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="petal"
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${petal.size}px`,
            "--o": petal.opacity,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            "--drift": `${petal.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
