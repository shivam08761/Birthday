let audioContext = null;

function getContext() {
  if (typeof window === "undefined") return null;

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;

  if (!audioContext) {
    audioContext = new AudioContextClass();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  return audioContext;
}

const CHIMES = {
  pop: { notes: [523.25, 783.99], gap: 0.05, length: 0.32, volume: 0.035 },
  tick: { notes: [880], gap: 0, length: 0.22, volume: 0.025 },
  sparkle: { notes: [659.25, 880, 1174.66], gap: 0.08, length: 0.5, volume: 0.03 },
  celebrate: { notes: [523.25, 659.25, 783.99, 1046.5], gap: 0.1, length: 0.95, volume: 0.045 },
};

export function playChime(kind = "tick") {
  const audio = getContext();
  if (!audio) return;

  const chime = CHIMES[kind] || CHIMES.tick;
  const now = audio.currentTime;

  chime.notes.forEach((frequency, index) => {
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    const start = now + index * chime.gap;

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;

    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.linearRampToValueAtTime(chime.volume, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + chime.length);

    oscillator.connect(gain);
    gain.connect(audio.destination);
    oscillator.start(start);
    oscillator.stop(start + chime.length + 0.05);
  });
}
