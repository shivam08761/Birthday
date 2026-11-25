import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Confetti from "../components/Confetti";
import Fireworks from "../components/Fireworks";
import {
  ArrowRightIcon,
  BookIcon,
  CakeIcon,
  CardsIcon,
  MailIcon,
  SparkIcon,
} from "../components/Icons";
import PhotoWall from "../components/PhotoWall";
import Reveal from "../components/Reveal";
import StickerWall from "../components/StickerWall";
import { HER_NAME, YOUR_NAME } from "../config";
import { playChime } from "../utils/sound";

const JOURNEY = [
  {
    to: "/story",
    icon: BookIcon,
    tag: "01",
    title: "Kchh Baaten",
    text: "Teen chhote panno mein woh simple si baat jo class ke saath judi hain.",
  },
  {
    to: "/letter",
    icon: MailIcon,
    tag: "02",
    title: "Ek chitthi",
    text: "Open kro Envelope kholo.",
  },
  {
    to: "/wish",
    icon: CakeIcon,
    tag: "03",
    title: "Cake Celebration",
    text: "Candles bujhao, wish maango, aur cake kaato ",
  },
  {
    to: "/cards",
    icon: CardsIcon,
    tag: "04",
    title: "Chhoti wishes jo tmhare liye kam hain",
    text: "6 cards, 6 blessing. Har card ko palto aur ek wish padho.",
  },
  {
    to: "/finale",
    icon: SparkIcon,
    tag: "05",
    title: "End ",
    text: "Ek chhoti si code-wish.",
  },
];

const BALLOONS = [
  { id: "hansi", label: "Hansi", text: "Tumhari hansi kabhi kam na ho." },
  { id: "sapne", label: "Sapne", text: "Tumhare sapne tumse milne zaroor aayein." },
  { id: "sukoon", label: "Sukoon", text: "Har din mein thoda sa sukoon mile." },
  { id: "himmat", label: "Himmat", text: "Mushkil dinon mein bhi khud par bharosa rahe." },
  { id: "zindagi", label: "Zindagi", text: "Tum jitni zinda ho, utni hi zinda raho." },
  { id: "class", label: "Class", text: "Class ke din thode aur acche ho jaayein." },
  { id: "dua", label: "Dua", text: "Jo dua dil se maango, woh poori ho." },
];

const BALLOON_COLORS = [
  ["#ffb1d0", "#e75f92"],
  ["#ffd1ae", "#e29563"],
  ["#e3c2ff", "#a778d8"],
  ["#ffb8c7", "#d56a86"],
  ["#ffd9ea", "#d98ab2"],
  ["#ffc6b8", "#d97a6d"],
  ["#f7b9e5", "#c66aa8"],
];

export default function HomePage() {
  const location = useLocation();
  const [entryCelebration] = useState(Boolean(location.state?.celebrate));
  const [popped, setPopped] = useState([]);
  const [fireworks, setFireworks] = useState(entryCelebration ? 1 : 0);
  const allPopped = popped.length === BALLOONS.length;

  useEffect(() => {
    if (allPopped) {
      setFireworks((count) => count + 1);
    }
  }, [allPopped]);

  const popBalloon = (id) => {
    if (popped.includes(id)) return;
    playChime("pop");
    setPopped((current) => [...current, id]);
    setFireworks((count) => count + 1);
  };

  const launchFireworks = () => {
    playChime("celebrate");
    setFireworks((count) => count + 1);
  };

  return (
    <>
      {entryCelebration && <Confetti count={160} />}
      <section className="hero">
        <span className="hero-orb" aria-hidden="true" />
        <div className="hero-balloons" aria-hidden="true">
          <span className="hero-balloon hb-a" />
          <span className="hero-balloon hb-b" />
          <span className="hero-balloon hb-c" />
          <span className="hero-balloon hb-d" />
        </div>
        <SparkIcon className="hero-spark hero-spark-a" />
        <SparkIcon className="hero-spark hero-spark-b" />
        <div className="hero-content">
          <p className="kicker hero-enter hero-enter-1">Aaj ka din tumhara hai</p>
          <p className="hero-script hero-enter hero-enter-2">happy birthday,</p>
          <h1 className="hero-name hero-enter hero-enter-3">{HER_NAME}</h1>
          <p className="hero-line hero-enter hero-enter-4">
            Ek chhoti si duniya, sirf aaj ke liye. Kuch yaadein, ek chitthi, thoda
            sa cake, aur bahut saari duaein — sab tumhare naam.
          </p>
          <div className="btn-row hero-enter hero-enter-5">
            <Link className="btn btn-primary" to="/story">
              Start here
              <ArrowRightIcon className="btn-icon" />
            </Link>
            {/* <Link className="btn btn-ghost" to="/wish">
              Seedha cake par
            </Link> */}
          </div>
          <p className="hero-meta hero-enter hero-enter-6">
            <span>03 panno ka safar</span>
            <span className="hero-dot" />
            <span>ek chitthi</span>
            <span className="hero-dot" />
            <span>ek cake</span>
          </p>
        </div>
      </section>

      {/* <section className="section home-journey">
        <div className="container">
          <Reveal className="section-head">
            <p className="kicker">Safar</p>
            <h2 className="section-title">
              Jo aaj tumhare liye <em>rakha hai</em>
            </h2>
            <p className="section-sub">
              Har page ek chhota sa lamha hai. Kis se shuru karna hai, yeh tum
              chuno — par sab dekhna.
            </p>
          </Reveal>
          <div className="journey">
            {JOURNEY.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.to} delay={index * 70}>
                  <Link className="journey-card" to={item.to}>
                    <span className="journey-top">
                      <Icon className="journey-icon" />
                      <span className="journey-tag">{item.tag}</span>
                    </span>
                    <span className="journey-title">{item.title}</span>
                    <span className="journey-text">{item.text}</span>
                    <span className="journey-link">
                      Kholo
                      <ArrowRightIcon className="journey-arrow" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <PhotoWall />

      <StickerWall />

      <section className="section balloons-section">
        <div className="container">
          <Reveal className="section-head">
            <p className="kicker">Gubbare &amp; patakhe</p>
            <h2 className="section-title">
              Saat gubbare, <em>saat duaein</em>
            </h2>
            <p className="section-sub">
              Gubbare hawa mein ud rahe hain — tap karke phodo aur andar ki dua
              padho. Neeche se patakhe bhi chala sakti ho.
            </p>
          </Reveal>

          <div className="balloon-toolbar">
            <span className="pop-counter">
              {popped.length} / {BALLOONS.length} gubbare phoote
            </span>
            <button type="button" className="btn btn-ghost" onClick={launchFireworks}>
              <SparkIcon className="btn-icon" />
              Patakhe chalao
            </button>
          </div>

          <div className="balloon-stage">
            {BALLOONS.map((balloon, index) => {
              const isPopped = popped.includes(balloon.id);
              const [c1, c2] = BALLOON_COLORS[index % BALLOON_COLORS.length];
              return (
                <div
                  key={balloon.id}
                  className={`balloon-item ${isPopped ? "is-popped" : ""}`}
                  style={{ "--bf": `${4.2 + (index % 3) * 0.9}s` }}
                >
                  <button
                    type="button"
                    className="balloon-btn"
                    onClick={() => popBalloon(balloon.id)}
                    disabled={isPopped}
                    aria-label={`${balloon.label} gubbara phodo`}
                  >
                    <span className="balloon-burst" />
                    <span
                      className="balloon-shape"
                      style={{
                        "--c1": c1,
                        "--c2": c2,
                        "--d": `${index * 0.4}s`,
                      }}
                    />
                    <span className="balloon-knot" style={{ "--c2": c2 }} />
                    <span className="balloon-string" />
                  </button>
                  <span className="balloon-label">{balloon.label}</span>
                  <span className="balloon-wish">
                    {isPopped ? balloon.text : "tap to pop"}
                  </span>
                </div>
              );
            })}
          </div>

          {allPopped && (
            <div className="balloon-complete">
              <Confetti key="balloons" count={140} />
              <p className="balloon-finale">
                Saari duaein hawa mein. Ab bas poori hone ki baari.
              </p>
              <Link className="btn btn-primary" to="/finale">
                Aakhri surprise
                <ArrowRightIcon className="btn-icon" />
              </Link>
            </div>
          )}
        </div>
      </section> */}

      <section className="section home-close">
        <Reveal className="container home-close-inner">
          <SparkIcon className="home-close-spark" />
          
         
          <p className="home-close-sign">Greetings by  {YOUR_NAME}</p>
        </Reveal>
      </section>

      <Fireworks trigger={fireworks} bursts={4} />
    </>
  );
}
