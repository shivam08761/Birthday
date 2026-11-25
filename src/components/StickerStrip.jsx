export default function StickerStrip({ stickers, label, className = "" }) {
  return (
    <div className={`sticker-strip ${className}`.trim()} aria-hidden="true">
      {stickers.map(({ Icon, tone = "rose", rotate = 0 }, index) => (
        <span
          key={`${tone}-${index}`}
          className={`sticker sticker-${tone}`}
          style={{ "--r": `${rotate}deg` }}
        >
          <Icon className="sticker-icon" />
        </span>
      ))}
      {label ? <span className="sticker-label">{label}</span> : null}
    </div>
  );
}
