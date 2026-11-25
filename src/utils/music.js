let startRequested = false;

export function requestMusicStart() {
  startRequested = true;
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("birthday:music-start"));
  }
}

export function consumeMusicStart() {
  const requested = startRequested;
  startRequested = false;
  return requested;
}
