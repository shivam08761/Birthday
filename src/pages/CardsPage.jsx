import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Confetti from "../components/Confetti";
import Fireworks from "../components/Fireworks";
import { ArrowRightIcon, CardsIcon } from "../components/Icons";
import PageHead from "../components/PageHead";
import Reveal from "../components/Reveal";
import { CARDS } from "../data/cards";
import { playChime } from "../utils/sound";

export default function CardsPage() {
  const [order, setOrder] = useState(CARDS);
  const [revealed, setRevealed] = useState([]);
  const [fireworks, setFireworks] = useState(0);
  const allRevealed = revealed.length === CARDS.length;

  useEffect(() => {
    if (allRevealed) {
      setFireworks((count) => count + 1);
    }
  }, [allRevealed]);

  const flip = (id) => {
    if (revealed.includes(id)) return;
    playChime("sparkle");
    setRevealed((current) => [...current, id]);
  };

  const shuffle = () => {
    playChime("tick");
    setRevealed([]);
    setOrder((current) => {
      const next = [...current];
      for (let i = next.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [next[i], next[j]] = [next[j], next[i]];
      }
      return next;
    });
  };

  return (
    <section className="section page">
      <div className="container">
        <PageHead
          kicker="Chhoti chhoti wishes"
          title={
            <>
              Cheh cards, <em>cheh duaein</em>
            </>
          }
          sub="Har card ke peeche ek chhoti si dua chhupi hai. Sab kholo — jitni der lagegi, utni der maza aayega."
        />

        <Reveal className="cards-body">
          <div className="cards-toolbar">
            <span className="cards-count">
              {revealed.length} / {CARDS.length} wishes khuli
            </span>
            <button type="button" className="btn btn-ghost" onClick={shuffle}>
              Shuffle karo
            </button>
          </div>

          <div className="cards-grid">
            {order.map((card, index) => {
              const isRevealed = revealed.includes(card.id);
              return (
                <button
                  key={card.id}
                  type="button"
                  className={`flip-card ${isRevealed ? "is-flipped" : ""}`}
                  onClick={() => flip(card.id)}
                  aria-pressed={isRevealed}
                  aria-label={
                    isRevealed ? card.title : `${card.tag} wish kholo`
                  }
                >
                  <span className="flip-inner">
                    <span className="flip-face flip-front">
                      <CardsIcon className="flip-icon" />
                      <span className="flip-tag">{card.tag}</span>
                      <span className="flip-tap">Tap to open</span>
                    </span>
                    <span className="flip-face flip-back">
                      <span className="flip-num">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="flip-body">
                        <span className="flip-title">{card.title}</span>
                        <span className="flip-text">{card.text}</span>
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {allRevealed && (
            <div className="cards-finale">
              <p className="cards-finale-text">
                Saari wishes khul gayi. Ab ek aakhri  bacha hai.
              </p>
              <Link className="btn btn-primary" to="/finale">
                Finale kholo
                <ArrowRightIcon className="btn-icon" />
              </Link>
            </div>
          )}
        </Reveal>
      </div>

      {allRevealed && <Confetti key="cards-complete" count={110} />}
      <Fireworks trigger={fireworks} bursts={5} />
    </section>
  );
}
