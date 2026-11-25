import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BookIcon,
  CoffeeIcon,
  GraduationIcon,
  HeartIcon,
  SmileIcon,
  StickerIcon,
} from "../components/Icons";
import EmojiStickerRow from "../components/EmojiStickerRow";
import PageHead from "../components/PageHead";
import Reveal from "../components/Reveal";
import StickerStrip from "../components/StickerStrip";
import { CHAPTERS } from "../data/chapters";
import { playChime } from "../utils/sound";

const CHAPTER_STICKERS = [
  [
    { Icon: BookIcon, tone: "rose", rotate: -6 },
    { Icon: GraduationIcon, tone: "gold", rotate: 5 },
  ],
  [
    { Icon: CoffeeIcon, tone: "violet", rotate: -4 },
    { Icon: SmileIcon, tone: "gold", rotate: 6 },
  ],
  [
    { Icon: HeartIcon, tone: "gold", rotate: -5 },
    { Icon: StickerIcon, tone: "mint", rotate: 4 },
  ],
];

const CHAPTER_EMOJIS = [
  [
    { emoji: "📚", anim: "sway" },
    { emoji: "✏️", anim: "wiggle" },
    { emoji: "🌸", anim: "twinkle" },
  ],
  [
    { emoji: "☕", anim: "float" },
    { emoji: "😄", anim: "bounce" },
    { emoji: "✨", anim: "twinkle" },
  ],
  [
    { emoji: "💖", anim: "beat" },
    { emoji: "🎓", anim: "wiggle" },
    { emoji: "🎈", anim: "float" },
  ],
];

export default function StoryPage() {
  const [index, setIndex] = useState(0);
  const chapter = CHAPTERS[index];
  const isLast = index === CHAPTERS.length - 1;

  const showChapter = (next) => {
    const target = Math.max(0, Math.min(CHAPTERS.length - 1, next));
    if (target === index) return;
    playChime("tick");
    setIndex(target);
  };

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "ArrowRight") {
        setIndex((current) => {
          const target = Math.min(CHAPTERS.length - 1, current + 1);
          if (target !== current) playChime("tick");
          return target;
        });
      }
      if (event.key === "ArrowLeft") {
        setIndex((current) => {
          const target = Math.max(0, current - 1);
          if (target !== current) playChime("tick");
          return target;
        });
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="section page">
      <div className="container">
        <PageHead
          kicker="Chhoti si kahani"
          title={
            <>
              Classmates, aur teen <em>chhote lamhe</em>
            </>
          }
          sub="Koi badi kahani nahi — bas class, kuch hansi, aur aaj ka din."
        />

        <Reveal className="story-stage">
          <div className="story-dots" aria-label="Chapters">
            {CHAPTERS.map((item, itemIndex) => (
              <button
                key={item.short}
                type="button"
                className={`story-dot ${itemIndex === index ? "is-active" : ""} ${
                  itemIndex < index ? "is-done" : ""
                }`}
                onClick={() => showChapter(itemIndex)}
                aria-label={`Chapter ${itemIndex + 1}: ${item.short}`}
                aria-current={itemIndex === index ? "step" : undefined}
              >
                {String(itemIndex + 1).padStart(2, "0")}
              </button>
            ))}
          </div>

          <article key={index} className="story-card">
            <div className="story-progress" aria-hidden="true">
              <span
                style={{ width: `${((index + 1) / CHAPTERS.length) * 100}%` }}
              />
            </div>
            <p className="chapter-label">
              Chapter {String(index + 1).padStart(2, "0")} of{" "}
              {String(CHAPTERS.length).padStart(2, "0")} — {chapter.short}
            </p>
            <h2>{chapter.title}</h2>
            {chapter.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
            <StickerStrip
              className="story-stickers"
              stickers={CHAPTER_STICKERS[index]}
              label={isLast ? "classmates" : undefined}
            />
            <EmojiStickerRow
              className="story-emoji-stickers"
              stickers={CHAPTER_EMOJIS[index]}
            />
          </article>

          <div className="story-controls">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => showChapter(index - 1)}
              disabled={index === 0}
            >
              <ArrowLeftIcon className="btn-icon" />
              Pichla
            </button>
            {isLast ? (
              <Link className="btn btn-primary" to="/letter">
                Chitthi padho
                <ArrowRightIcon className="btn-icon" />
              </Link>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => showChapter(index + 1)}
              >
                Aage
                <ArrowRightIcon className="btn-icon" />
              </button>
            )}
          </div>
          <p className="story-hint">Teer (arrow) keys se bhi badal sakti ho</p>
        </Reveal>
      </div>
    </section>
  );
}
