import { useMemo } from "react";

const EMOJIS = ["🎉", "🎈", "🎂", "💖", "🧸", "🌸", "⭐", "🎁", "🍰", "✨", "🦄", "🥳"];

export default function StickerRain({ trigger = 0, count = 26 }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        left: Math.random() * 100,
        size: 20 + Math.random() * 26,
        delay: Math.random() * 1.4,
        duration: 3.4 + Math.random() * 2.8,
        drift: (Math.random() - 0.5) * 260,
        spin: Math.random() * 540 - 270,
      })),
    [trigger, count]
  );

  if (!trigger) return null;

  return (
    <div key={trigger} className="sticker-rain" aria-hidden="true">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="sticker-rain-piece"
          style={{
            left: `${piece.left}%`,
            fontSize: `${piece.size}px`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            "--drift": `${piece.drift}px`,
            "--spin": `${piece.spin}deg`,
          }}
        >
          {piece.emoji}
        </span>
      ))}
    </div>
  );
}
