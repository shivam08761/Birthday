import { useRef, useState } from "react";
import Confetti from "./Confetti";
import { SparkIcon } from "./Icons";
import Reveal from "./Reveal";
import StickerRain from "./StickerRain";
import { playChime } from "../utils/sound";

const STICKERS = [
  { emoji: "🎂", label: "Cake", anim: "bounce" },
  { emoji: "🎈", label: "Balloon", anim: "float" },
  { emoji: "🎁", label: "Gift", anim: "wiggle" },
  { emoji: "🧸", label: "Teddy", anim: "sway" },
  { emoji: "🌸", label: "Flower", anim: "spin" },
  { emoji: "💖", label: "Heart", anim: "beat" },
  { emoji: "⭐", label: "Star", anim: "twinkle" },
  { emoji: "🦄", label: "Unicorn", anim: "bounce" },
  { emoji: "🍰", label: "Slice", anim: "wiggle" },
  { emoji: "🎉", label: "Party", anim: "sway" },
];

const TILTS = [-5, 4, -3, 6, -4, 3, -6, 5, -2, 4];

export default function StickerWall() {
  const [pops, setPops] = useState([]);
  const [taps, setTaps] = useState(0);
  const [showers, setShowers] = useState(0);
  const nextPopId = useRef(0);

  const poke = (sticker, index) => {
    playChime("pop");
    nextPopId.current += 1;
    setTaps((count) => count + 1);
    setPops((current) => [
      ...current.slice(-11),
      { id: nextPopId.current, index, emoji: sticker.emoji },
    ]);
  };

  const clearPop = (id) => {
    setPops((current) => current.filter((pop) => pop.id !== id));
  };

  const shower = () => {
    playChime("celebrate");
    setShowers((count) => count + 1);
  };

  return (
    <section className="section stickers-section">
      <div className="container">
        <Reveal className="section-head">
          <p className="kicker">Sticker wall</p>
          <h2 className="section-title">
            Stickers, jo sirf <em>tumhare liye</em> hain
          </h2>
          <p className="section-sub">
            Har sticker zinda hai — tap karo aur upar udta dekho. Neeche wale
            button se poora sticker shower bhi gir sakta hai.
          </p>
        </Reveal>

        <Reveal className="sticker-board">
          <div className="sticker-toolbar">
            <span className="sticker-count">
              {taps} sticker {taps === 1 ? "tap" : "taps"}
            </span>
            <span className="sticker-toolbar-note">
              Tap any sticker → pop!
            </span>
            <button type="button" className="btn btn-ghost" onClick={shower}>
              <SparkIcon className="btn-icon" />
              Sticker shower
            </button>
          </div>

          <div className="sticker-grid">
            {STICKERS.map((sticker, index) => (
              <button
                key={sticker.label}
                type="button"
                className={`sticker-tile st-anim-${sticker.anim}`}
                style={{
                  "--tilt": `${TILTS[index % TILTS.length]}deg`,
                  "--delay": `${(index % 5) * 0.28}s`,
                }}
                onClick={() => poke(sticker, index)}
                aria-label={`${sticker.label} sticker pop karo`}
              >
                <span className="sticker-gif">GIF</span>
                <span className="sticker-emoji">{sticker.emoji}</span>
                <span className="sticker-name">{sticker.label}</span>
                {pops
                  .filter((pop) => pop.index === index)
                  .map((pop) => (
                    <span
                      key={pop.id}
                      className="sticker-pop"
                      onAnimationEnd={() => clearPop(pop.id)}
                    >
                      {pop.emoji}
                    </span>
                  ))}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {showers > 0 && (
        <Confetti key={`sticker-confetti-${showers}`} count={70} />
      )}
      <StickerRain trigger={showers} count={28} />
    </section>
  );
}
