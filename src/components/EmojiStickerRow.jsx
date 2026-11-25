const TILTS = [-6, 4, -2, 5, -4, 3];

export default function EmojiStickerRow({ stickers, label, className = "" }) {
  return (
    <div className={`emoji-row ${className}`.trim()} aria-hidden="true">
      {stickers.map((sticker, index) => {
        const emoji = typeof sticker === "string" ? sticker : sticker.emoji;
        const anim = typeof sticker === "string" ? "wiggle" : sticker.anim || "wiggle";
        return (
          <span
            key={`${emoji}-${index}`}
            className={`emoji-chip emoji-anim-${anim}`}
            style={{
              "--r": `${TILTS[index % TILTS.length]}deg`,
              "--d": `${index * 0.3}s`,
            }}
          >
            <span className="emoji-chip-face">{emoji}</span>
          </span>
        );
      })}
      {label ? <span className="sticker-label">{label}</span> : null}
    </div>
  );
}
