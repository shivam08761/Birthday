import { useMemo } from "react";

const TONES = ["pink", "rose", "blush", "lilac", "coral", "pink"];

export default function FlyingBalloons({ count = 7 }) {
  const balloons = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: 4 + Math.random() * 88,
        size: 26 + Math.random() * 30,
        duration: 26 + Math.random() * 22,
        delay: -Math.random() * 40,
        drift: (Math.random() - 0.5) * 180,
        opacity: 0.2 + Math.random() * 0.18,
        tone: TONES[Math.floor(Math.random() * TONES.length)],
        tilt: (Math.random() - 0.5) * 12,
      })),
    [count]
  );

  return (
    <div className="flying-balloons" aria-hidden="true">
      {balloons.map((balloon) => (
        <span
          key={balloon.id}
          className={`flying-balloon fb-${balloon.tone}`}
          style={{
            left: `${balloon.left}%`,
            width: `${balloon.size}px`,
            height: `${balloon.size * 1.22}px`,
            animationDelay: `${balloon.delay}s`,
            animationDuration: `${balloon.duration}s`,
            "--o": balloon.opacity,
            "--drift": `${balloon.drift}px`,
            "--tilt": `${balloon.tilt}deg`,
          }}
        >
          <span className="fb-body" />
          <span className="fb-tie" />
          <span className="fb-string" />
        </span>
      ))}
    </div>
  );
}
