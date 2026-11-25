import { useMemo } from "react";
import Reveal from "./Reveal";

const PHOTO_MODULES = import.meta.glob(
  "../assets/photos/*.{jpg,jpeg,png,webp,avif,gif}",
  { eager: true, import: "default" }
);

const SHAPES = ["portrait", "landscape", "square", "portrait", "landscape", "square"];
const TILTS = [-5, 4, -3, 6, -4, 3];
const TONES = ["rose", "gold", "violet", "mint", "peach", "rose"];
const PLACEHOLDER_EMOJIS = ["🌸", "✨", "💖", "🌙", "🎀", "🫶"];
const FALLBACK_CAPTIONS = [
  "ek yaad",
  "woh pal",
  "class ke din",
  "muskaan",
  "dosti",
  "aaj ka din",
];

function captionFromPath(path, index) {
  const base = path
    .split("/")
    .pop()
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .trim();

  if (!base || /^(img|dsc|pxl|photo|image|snap|vid)[\s-]?\d*$/i.test(base)) {
    return FALLBACK_CAPTIONS[index % FALLBACK_CAPTIONS.length];
  }

  return base;
}

export default function PhotoWall() {
  const photos = useMemo(
    () =>
      Object.entries(PHOTO_MODULES)
        .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
        .map(([path, src], index) => ({
          id: path,
          src,
          caption: captionFromPath(path, index),
        })),
    []
  );

  const items =
    photos.length > 0
      ? photos
      : FALLBACK_CAPTIONS.slice(0, 4).map((caption, index) => ({
          id: `placeholder-${index}`,
          src: "",
          caption,
        }));

  return (
    <section className="section photo-section">
      <div className="container">
        <Reveal className="section-head">
          <p className="kicker">Yaadein</p>
          <h2 className="section-title">
            Kuch pal, <em>frame mein</em>
          </h2>
          <p className="section-sub">
            Har frame ek chhoti si yaad — dheere se dekho, muskurao, aur aage
            badho.
          </p>
        </Reveal>

        <Reveal className="photo-wall">
          {items.map((item, index) => (
            <figure
              key={item.id}
              className={`photo-frame photo-${TONES[index % TONES.length]} photo-${
                SHAPES[index % SHAPES.length]
              }`}
              style={{ "--tilt": `${TILTS[index % TILTS.length]}deg` }}
            >
              <span className="photo-tape" aria-hidden="true" />
              <div className="photo-window">
                {item.src ? (
                  <img
                    src={item.src}
                    alt={`Yaad ${index + 1} — ${item.caption}`}
                    loading="lazy"
                  />
                ) : (
                  <span className="photo-empty" aria-hidden="true">
                    {PLACEHOLDER_EMOJIS[index % PLACEHOLDER_EMOJIS.length]}
                  </span>
                )}
              </div>
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
