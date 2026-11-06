"use client";

import { useRef } from "react";
import { generateMelody, Mood } from "@/lib/music";

interface Props {
  name: string;
  mood: Mood;
}

export default function Controls({ name, mood }: Props) {
  const audioRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<OscillatorNode[]>([]);

  const stop = () => {
    nodesRef.current.forEach((node) => {
      try {
        node.stop();
      } catch {}
    });

    nodesRef.current = [];
  };

  const play = async () => {
    stop();

    const AudioContextClass =
      window.AudioContext ||
      (window as typeof window & {
        webkitAudioContext?: typeof AudioContext;
      }).webkitAudioContext;

    if (!AudioContextClass) return;

    const ctx =
      audioRef.current ||
      (audioRef.current = new AudioContextClass());

    await ctx.resume();

    const melody = generateMelody(name, mood);

    melody.forEach((note, index) => {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      const startTime = ctx.currentTime + index * 0.45;

      oscillator.type = "sine";
      oscillator.frequency.value = note.frequency;

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.16, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        startTime + 0.4
      );

      oscillator.connect(gain);
      gain.connect(ctx.destination);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.42);

      nodesRef.current.push(oscillator);
    });
  };

  return (
    <div className="flex gap-3 justify-center">
      <button onClick={play} className="action-button">
        ▶ Play
      </button>

      <button onClick={stop} className="action-button secondary">
        ■ Stop
      </button>
    </div>
  );
}