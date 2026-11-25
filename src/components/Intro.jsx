import { useEffect, useRef, useState } from "react";
import Stars from "./Stars";
import { HER_NAME } from "../config";
import { requestMusicStart } from "../utils/music";
import { playChime } from "../utils/sound";

export default function Intro({ onEnter }) {
  const [opening, setOpening] = useState(false);
  const busy = useRef(false);
  const timer = useRef(null);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    []
  );

  const open = () => {
    if (busy.current) return;
    busy.current = true;
    playChime("celebrate");
    requestMusicStart();
    setOpening(true);
    timer.current = window.setTimeout(onEnter, 2050);
  };

  return (
    <div className={`intro ${opening ? "is-opening" : ""}`}>
      <Stars count={110} />
      <div className="intro-vignette" aria-hidden="true" />
      <div className="intro-content">
        <h1 className="intro-script">Happy Birthday</h1>
        

        <button
          type="button"
          className="window-btn"
          onClick={open}
          aria-label="Open the birthday window"
        >
          <span className="window">
            <span className="window-glass">
              <span className="window-sky" />
              <span className="window-moon" />
              <span className="window-star window-star-a" />
              <span className="window-star window-star-b" />
              <span className="window-star window-star-c" />
              <span className="curtain curtain-left" />
              <span className="curtain curtain-right" />
              <span className="window-bars" />
              <span className="window-bloom" />
            </span>
            <span className="window-sill" />
          </span>
        </button>

        <p className="intro-hint">tap the window to open your gift</p>
      </div>
      <span className="intro-flash" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
    </div>
  );
}
