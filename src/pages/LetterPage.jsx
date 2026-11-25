import { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  CakeIcon,
  CoffeeIcon,
  GraduationIcon,
  HeartIcon,
  SmileIcon,
} from "../components/Icons";
import EmojiStickerRow from "../components/EmojiStickerRow";
import PageHead from "../components/PageHead";
import Reveal from "../components/Reveal";
import StickerStrip from "../components/StickerStrip";
import { HER_NAME, YOUR_NAME } from "../config";
import { playChime } from "../utils/sound";

const LETTER = [
  "First of all, Happy Birthday! ❤️",
  "Pata nahi ye letter tumhare liye kitna maayne rakhega, but main kuch baatein kehna chahta hoon jo shayad kabhi saamne se nahi keh paaya.",
  "Hum ek hi class mein hain, ek hi college mein itne saal rahe, lekin shayad kabhi itni baatein nahi hui jitni honi chahiye thi. Ab hum 3rd year mein hain, aur kuch waqt baad B.Tech bhi khatam ho jayegi. Sab apni-apni life mein busy ho jayenge. Shayad phir kabhi milna ho, shayad na ho. Pata nahi...",
  "Bas itna chahta hoon ki jab bhi tum apne college ke din yaad karo, toh un yaadon mein meri taraf se kuch achha bhi ho.",
  "Main jaanta hoon, main perfect nahi hoon. Shayad mujhse jaane-anjaane mein kuch galtiyan hui hongi, kuch baatein buri lagi hongi. Us sab ke liye genuinely sorry. Main achha nahi hoon, I know, but kabhi kisi ka bura chahne ka iraada nahi rakha.",
  "Agar kabhi meri wajah se tumhe bura laga ho, toh please un baaton ko bhula dena. Meri taraf se bas achhi yaadein rakhna aur buri baaton ko jaane dena.",
  "Zindagi mein bahut se log milenge, kuch saath rahenge aur kuch bas yaadon ka hissa bankar reh jayenge. Shayad main bhi unhi mein se ek hoon. Bas dua hai ki tumhari life mein hamesha khushiyan rahein, tum jo bhi banna chahti ho bano aur tumhare saare sapne poore hon.",
  "Aur haan, ek baat... Mere jaise insaan tumhe dobara kabhi na mile. 😅 Shayad ye achhi baat hi hogi.",
  "Ek chhoti si shayari tumhare liye:",
];

const LETTER_POEM = [
  "Waqt guzar jayega, ye college bhi chhoot jayega,",
  "Har chehra apni manzil ki taraf mud jayega,",
  "Na jaane phir kab mulaqat ho ya na ho,",
  "Bas dua hai, tumhara chehra hamesha muskurayega.",
];

const LETTER_OUTRO = [
  "Once again, Happy Birthday! 🎂",
  "Khush rehna, apna khayal rakhna aur zindagi mein kabhi apni muskurahat mat khona.",
];

const LETTER_QUOTE =
  "Some people are not meant to stay forever, but they still become a beautiful part of our memories.";

export default function LetterPage() {
  const [open, setOpen] = useState(false);
  const [opening, setOpening] = useState(false);
  const timer = useRef(null);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    []
  );

  const openLetter = () => {
    if (opening || open) return;
    playChime("sparkle");
    setOpening(true);
    timer.current = window.setTimeout(() => setOpen(true), 750);
  };

  return (
    <section className="section page">
      <div className="container">
        <PageHead
          kicker="Ek chitthi"
          title={
            <>
              Jo bolne se aasan hai, <em>likhna</em>
            </>
          }
          sub="Ek envelope, andar ek chitthi. Kholo jab mann kare — jaldi nahi hai."
        />

        {!open ? (
          <Reveal className="envelope-scene">
            <button
              type="button"
              className="envelope-btn"
              onClick={openLetter}
              aria-label="Chitthi kholo"
            >
              <span className={`envelope ${opening ? "is-opening" : ""}`}>
                <span className="envelope-back" />
                <span className="envelope-letter">
                  <HeartIcon className="envelope-mail-icon" />
                </span>
                <span className="envelope-pocket" />
                <span className="envelope-flap" />
                <span className="envelope-seal">
                  <HeartIcon className="envelope-heart" />
                </span>
              </span>
              <span className="envelope-hint">
                {opening ? "Khul rahi hai..." : "Kholne ke liye tap karo"}
              </span>
            </button>
          </Reveal>
        ) : (
          <div className="letter-wrap">
            <article className="letter letter-open">
              <p className="letter-salutation">{HER_NAME},</p>
              {LETTER.map((paragraph, index) => (
                <Fragment key={paragraph.slice(0, 28)}>
                  <p>{paragraph}</p>
                  {index === 0 ? (
                    <StickerStrip
                      className="letter-stickers"
                      stickers={[
                        { Icon: CakeIcon, tone: "rose", rotate: -5 },
                        { Icon: CoffeeIcon, tone: "gold", rotate: 4 },
                        { Icon: SmileIcon, tone: "violet", rotate: -3 },
                      ]}
                    />
                  ) : null}
                </Fragment>
              ))}
              <p className="letter-whisper">
                {LETTER_POEM.map((line, index) => (
                  <Fragment key={line}>
                    {line}
                    {index < LETTER_POEM.length - 1 ? <br /> : null}
                  </Fragment>
                ))}
              </p>
              {LETTER_OUTRO.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
              <p className="letter-quote">{LETTER_QUOTE}</p>
              <StickerStrip
                className="letter-stickers letter-stickers-end"
                stickers={[
                  { Icon: GraduationIcon, tone: "gold", rotate: -4 },
                ]}
                
              />
              <EmojiStickerRow
                className="letter-emoji-stickers"
                stickers={[
                  { emoji: "🎂", anim: "bounce" },
                  { emoji: "🎈", anim: "float" },
                  { emoji: "🧸", anim: "wiggle" },
                  { emoji: "💖", anim: "beat" },
                  { emoji: "🌸", anim: "sway" },
                ]}
              
              />
              <div className="letter-sign">
                <p className="sign-script">{YOUR_NAME}</p>
                
              </div>
            </article>
            <div className="btn-row letter-actions">
              <Link className="btn btn-primary" to="/wish">
                Ab cake Celebration
                <ArrowRightIcon className="btn-icon" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
