import { useState } from "react";
import { Link } from "react-router-dom";
import Confetti from "../components/Confetti";
import Fireworks from "../components/Fireworks";
import { ArrowRightIcon } from "../components/Icons";
import PageHead from "../components/PageHead";
import Reveal from "../components/Reveal";
import { playChime } from "../utils/sound";

const STAGES = [
  {
    hint: "Cake ko tap karke candles bujhao",
    title: "Pehle ek wish.",
    sub: "Aankhein band karo, dil se kuch maango, aur phir cake ko chhoo do.",
  },
  {
    hint: "Cake ko dobara tap karo",
    title: "Wish hawa mein.",
    sub: "Ab cake kaato — pehla piece tumhara, baaki sabka.",
  },
  {
    hint: "Lo, cake kat gaya",
    title: "Pehla piece tumhara.",
    sub: "Dheere se khao. Wish poori ho ya na ho, maangna kabhi mat chhodna.",
  },
];

export default function WishPage() {
  const [stage, setStage] = useState(0);
  const [celebration, setCelebration] = useState(0);
  const [fireworks, setFireworks] = useState(0);
  const current = STAGES[stage];

  const handleCake = () => {
    if (stage === 0) {
      playChime("celebrate");
      setStage(1);
      setCelebration((count) => count + 1);
      setFireworks((count) => count + 1);
      return;
    }
    if (stage === 1) {
      playChime("sparkle");
      setStage(2);
      setCelebration((count) => count + 1);
      setFireworks((count) => count + 1);
    }
  };

  const reset = () => {
    playChime("tick");
    setStage(0);
  };

  return (
    <section className="section page">
      <div className="container">
        <PageHead
          kicker="Cake ka waqt"
          title={
            <>
              Ek wish maango, <em>phir candles bujhao</em>
            </>
          }
          sub="Cake tak pahunchne ke liye buttons bhi hain, par asli maza tap karne mein hai."
        />

        <Reveal className="cake-card">
          <button
            type="button"
            className={`cake-touch ${stage > 1 ? "is-cut" : ""}`}
            onClick={handleCake}
            aria-label={
              stage === 0
                ? "Candles bujhao"
                : stage === 1
                  ? "Cake kaato"
                  : "Cake kat gaya"
            }
          >
            <span className="cake-stage">
              <span className="candles" aria-hidden="true">
                {[0, 1, 2].map((candle) => (
                  <span
                    key={candle}
                    className={`candle ${stage > 0 ? "is-out" : ""}`}
                  >
                    <span className="stick" />
                    <span className="wick" />
                    <span className="flame" />
                    <span className="smoke" />
                  </span>
                ))}
              </span>
              <span className="cake" aria-hidden="true">
                <span className="cake-glow" />
                <span className="tier tier-bottom" />
                <span className="tier tier-top" />
                <span className="plate" />
                <span className="cake-cut" />
                <span className="cake-slice" />
              </span>
            </span>
          </button>

          <div className="wish-note">
            <p className="wish-hint">{current.hint}</p>
            <p key={`title-${stage}`} className="wish-title">
              {current.title}
            </p>
            <p key={`sub-${stage}`} className="wish-sub">
              {current.sub}
            </p>
          </div>

          <div className="cake-actions">
            {stage === 2 ? (
              <>
                <Link className="btn btn-primary" to="/cards">
                  Ab cards kholo
                  <ArrowRightIcon className="btn-icon" />
                </Link>
                <button type="button" className="btn btn-ghost" onClick={reset}>
                  Phir se
                </button>
              </>
            ) : (
              <Link className="btn btn-ghost" to="/cards">
                Seedha cards par
              </Link>
            )}
          </div>
        </Reveal>

        <p className="page-footnote">
          Cake ka koi hisaab nahi hota — bas ek wish, thoda sa sukoon, aur
          bahut saari dua.
        </p>
      </div>

      {celebration > 0 && <Confetti key={celebration} count={130} />}
      <Fireworks trigger={fireworks} bursts={5} />
    </section>
  );
}
