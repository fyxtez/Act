export function playBeep(freq = 880, count = 4): void {
  try {
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextClass) {
      return;
    }

    const ctx = new AudioContextClass();

    for (let i = 0; i < count; i += 1) {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.frequency.value = freq;
      oscillator.type = 'square';

      const startAt = ctx.currentTime + i * 0.13;
      gain.gain.setValueAtTime(0.35, startAt);
      gain.gain.exponentialRampToValueAtTime(0.001, startAt + 0.1);
      oscillator.start(startAt);
      oscillator.stop(startAt + 0.11);
    }
  } catch {
    // Ignore audio failures.
  }
}
