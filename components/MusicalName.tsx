"use client";

import { useEffect, useRef } from "react";
import p5 from "p5";
import { generateMelody, Mood } from "@/lib/music";

interface Props {
  name: string;
  mood: Mood;
  darkMode: boolean;
}

export default function MusicalName({
  name,
  mood,
  darkMode,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let canvasWidth = 700;

      p.setup = () => {
        canvasWidth =
          containerRef.current?.clientWidth || 700;

        const canvas = p.createCanvas(canvasWidth, 360);
        canvas.parent(containerRef.current!);

        p.pixelDensity(Math.min(window.devicePixelRatio || 1, 2));
        p.noLoop();
      };

      p.draw = () => {
        const bg = darkMode ? "#111111" : "#ffffff";
        const fg = darkMode ? "#f5f0e8" : "#222222";

        p.background(bg);

        const melody = generateMelody(name || "NAME", mood);

        // Handwritten name
        p.push();
        p.fill(fg);
        p.noStroke();
        p.textAlign(p.CENTER, p.CENTER);
        p.textFont("Dancing Script");
        p.textSize(Math.min(65, canvasWidth / 8));
        p.text(name || "Your Name", canvasWidth / 2, 90);
        p.pop();

        // Musical staff
        const staffTop = 175;
        const spacing = 17;

        p.stroke(fg);
        p.strokeWeight(1);

        for (let i = 0; i < 5; i++) {
          const y = staffTop + i * spacing;
          p.line(20, y, canvasWidth - 20, y);
        }

        // Musical notes
        const availableWidth = canvasWidth - 70;
        const noteSpacing =
          availableWidth / Math.max(melody.length, 1);

        melody.forEach((note, index) => {
          const x = 35 + index * noteSpacing + noteSpacing / 2;

          const y =
            staffTop + 68 - note.noteIndex * 7;

          // Note head
          p.push();
          p.translate(x, y);
          p.rotate(-0.3);
          p.noStroke();
          p.fill(fg);
          p.ellipse(0, 0, 13, 9);
          p.pop();

          // Note stem
          p.stroke(fg);
          p.strokeWeight(1.5);
          p.line(x + 6, y, x + 6, y - 40);
        });

        // Decorative connecting line
        p.stroke(fg);
        p.strokeWeight(1);
        p.line(20, 270, canvasWidth - 20, 270);
      };

      p.windowResized = () => {
        if (!containerRef.current) return;

        canvasWidth = containerRef.current.clientWidth;
        p.resizeCanvas(canvasWidth, 360);
        p.redraw();
      };
    };

    const instance = new p5(sketch);

    return () => {
      instance.remove();
    };
  }, [name, mood, darkMode]);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden"
    />
  );
}