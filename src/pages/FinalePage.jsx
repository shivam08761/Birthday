import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Confetti from "../components/Confetti";
import Fireworks from "../components/Fireworks";
import {
  BookIcon,
  CakeIcon,
  CardsIcon,
  MailIcon,
  SparkIcon,
} from "../components/Icons";
import Reveal from "../components/Reveal";
import StickerRain from "../components/StickerRain";
import { HER_NAME, YOUR_NAME } from "../config";
import { playChime } from "../utils/sound";

const ROAD = [
  { to: "/story", label: "Kahani", icon: BookIcon },
  { to: "/letter", label: "Chitthi", icon: MailIcon },
  { to: "/wish", label: "Cake", icon: CakeIcon },
  { to: "/cards", label: "Wishes", icon: CardsIcon },
];

const FINALE_STICKERS = [
  { emoji: "🎂", anim: "bounce", pos: "a" },
  { emoji: "🎈", anim: "float", pos: "b" },
  { emoji: "🎉", anim: "wiggle", pos: "c" },
  { emoji: "💖", anim: "beat", pos: "d" },
  { emoji: "⭐", anim: "twinkle", pos: "e" },
  { emoji: "🧸", anim: "sway", pos: "f" },
];

export default function FinalePage() {
  const [bursts, setBursts] = useState(0);
  const [fireworks, setFireworks] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setFireworks((count) => count + 1);
    }, 900);
    return () => window.clearTimeout(timer);
  }, []);

  const celebrate = () => {
    playChime("celebrate");
    setBursts((count) => count + 1);
    setFireworks((count) => count + 1);
  };

  return (
    <>
      <section className="section page finale">
        <span className="finale-glow" aria-hidden="true" />
        <div className="finale-stickers" aria-hidden="true">
          {FINALE_STICKERS.map(({ emoji, anim, pos }) => (
            <span
              key={emoji}
              className={`finale-sticker st-anim-${anim} fs-${pos}`}
            >
              {emoji}
            </span>
          ))}
        </div>
        <div className="finale-inner container">
          <Reveal>
            <p className="kicker">Aakhri safha</p>
            <h1 className="finale-title">
              Happy birthday,
              <br />
              <span>{HER_NAME}</span>
            </h1>
            <p className="finale-line">
              Bas itna hi. Ek din, kuch yaadein, thodi si confetti, aur ek dost
              jo dil se dua karta hai.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="code-wish">
              <span className="code-line">
                <span className="code-kw">const</span> wish = {"{"}
              </span>
              <span className="code-line">
                {"  "}khushi: <span className="code-true">true</span>,
              </span>
              <span className="code-line">
                {"  "}sapne: <span className="code-str">"poore hon"</span>,
              </span>
              <span className="code-line">
                {"  "}hansi: <span className="code-str">"kam na ho"</span>,
              </span>
              <span className="code-line">{"}"};</span>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <p className="finale-close">
              Aur agar is saal kuch na bhi badle, ek cheez zaroor badle — tum
              khud ke saath thoda zyada narm raho. Baaki sab apne waqt par
              aayega.
            </p>
            <div className="btn-row">
              <button type="button" className="btn btn-primary" onClick={celebrate}>
                <SparkIcon className="btn-icon" />
                Patakhe chalao
              </button>
              <Link className="btn btn-ghost" to="/birthday">
                Shuru se dekho
              </Link>
            </div>
          </Reveal>

          <Reveal delay={280}>
            <div className="finale-signature">
              <span className="signature-line" />
              <p className="finale-sign-name">{YOUR_NAME}</p>
              <p className="finale-sign-note">ek dost, hamesha</p>
            </div>

            <div className="finale-links">
              {ROAD.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.to} className="finale-link" to={item.to}>
                    <Icon className="finale-link-icon" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {bursts > 0 && <Confetti key={bursts} count={120} />}
      <StickerRain trigger={bursts} count={26} />
      <Fireworks trigger={fireworks} bursts={5} />
    </>
  );
}
