import { useMemo } from "react";

const COLORS = ["#e2336b", "#ff6b9a", "#c98a2b", "#a86ad6", "#ff8fab", "#ff4d85"];

export default function Confetti({ count = 110 }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 1.6,
        duration: 3.8 + Math.random() * 3.2,
        drift: (Math.random() - 0.5) * 340,
        rotate: Math.random() * 720 - 360,
        width: 5 + Math.random() * 7,
        ratio: 1.2 + Math.random() * 1.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        round: Math.random() > 0.72,
      })),
    [count]
  );

  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className={`confetti-piece ${piece.round ? "is-round" : ""}`}
          style={{
            left: `${piece.left}%`,
            width: `${piece.width}px`,
            height: `${piece.width * piece.ratio}px`,
            background: piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            "--drift": `${piece.drift}px`,
            "--spin": `${piece.rotate}deg`,
          }}
        />
      ))}
    </div>
  );
}
