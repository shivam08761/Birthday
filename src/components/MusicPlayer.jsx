import { useEffect, useRef, useState } from "react";
import { SONG_ID } from "../config";
import { consumeMusicStart } from "../utils/music";
import { HeartIcon } from "./Icons";

let apiPromise = null;

function loadYouTubeApi() {
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previous === "function") previous();
      resolve(window.YT);
    };

    if (!document.getElementById("youtube-iframe-api")) {
      const script = document.createElement("script");
      script.id = "youtube-iframe-api";
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.head.appendChild(script);
    }
  });

  return apiPromise;
}

export default function MusicPlayer({ hidden = false }) {
  const playerRef = useRef(null);
  const mounted = useRef(true);
  const readyRef = useRef(false);
  const hiddenRef = useRef(hidden);
  hiddenRef.current = hidden;
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    mounted.current = true;
    let player = null;

    const playNow = () => {
      const active = playerRef.current;
      if (!active || !readyRef.current) return;
      try {
        active.unMute();
        active.setVolume(55);
        active.playVideo();
      } catch {
        return;
      }
    };

    const onMusicStart = () => playNow();
    window.addEventListener("birthday:music-start", onMusicStart);

    loadYouTubeApi().then((YT) => {
      if (!mounted.current) return;

      player = new YT.Player("yt-player", {
        videoId: SONG_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: (event) => {
            playerRef.current = event.target;
            readyRef.current = true;
            event.target.setVolume(55);
            setReady(true);
            event.target.mute();
            event.target.playVideo();

            if (consumeMusicStart()) {
              event.target.unMute();
              event.target.setVolume(55);
              event.target.playVideo();
              return;
            }

            if (hiddenRef.current) return;

            window.setTimeout(() => {
              if (mounted.current && playerRef.current && !hiddenRef.current) {
                playerRef.current.unMute();
              }
            }, 400);
          },
          onStateChange: (event) => {
            const state = event.data;
            setPlaying(state === window.YT.PlayerState.PLAYING);
            if (state === window.YT.PlayerState.ENDED) {
              event.target.seekTo(0);
              event.target.playVideo();
            }
          },
        },
      });
      playerRef.current = player;
    });

    return () => {
      mounted.current = false;
      readyRef.current = false;
      window.removeEventListener("birthday:music-start", onMusicStart);
      try {
        playerRef.current?.destroy();
      } catch {
        return;
      }
      playerRef.current = null;
    };
  }, []);

  const toggle = () => {
    const player = playerRef.current;
    if (!player || !ready) return;

    if (playing) {
      if (typeof player.isMuted === "function" && player.isMuted()) {
        player.unMute();
        player.setVolume(55);
        return;
      }
      player.pauseVideo();
    } else {
      player.unMute();
      player.setVolume(55);
      player.playVideo();
    }
  };

  return (
    <div className={`music-player ${hidden ? "" : "is-visible"}`}>
      <button
        type="button"
        className={`vinyl-btn ${playing ? "is-playing" : ""}`}
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        title={playing ? "Pause music" : "Play music"}
      >
        <span className="vinyl">
          <span className="vinyl-grooves" />
          <span className="vinyl-label">
            <HeartIcon className="vinyl-heart" />
          </span>
          <span className="vinyl-shine" />
        </span>
      </button>

      <div className="yt-hidden" aria-hidden="true">
        <div id="yt-player" />
      </div>
    </div>
  );
}
