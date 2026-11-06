"use client";

import { useState, useEffect } from "react";
import MusicalName from "@/components/MusicalName";
import Controls from "@/components/Controls";
import { Mood } from "@/lib/music";

export default function Home() {
  const [name, setName] = useState("Pranav");
  const [mood, setMood] = useState<Mood>("calm");
  const [darkMode, setDarkMode] = useState(true);

  const [origin, setOrigin] = useState("");

    useEffect(() => {
    setOrigin(window.location.origin);
    }, []);

  if (typeof window !== "undefined" && !origin) {
    setOrigin(window.location.origin);
  }

  const embedUrl =
    `${origin}/embed?name=${encodeURIComponent(name)}` +
    `&mood=${mood}`;

  const embedCode =
    `<iframe src="${embedUrl}" ` +
    `width="100%" height="400" ` +
    `frameborder="0" allow="autoplay"></iframe>`;

  const copy = async (value: string) => {
    await navigator.clipboard.writeText(value);
    alert("Copied successfully!");
  };

  return (
    <main className={darkMode ? "app dark" : "app light"}>

      <header>
        <h2>NAME / MELODY</h2>

        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀ Light" : "☾ Dark"}
        </button>
      </header>

      <section className="hero">
        <p className="eyebrow">YOUR NAME, YOUR MUSIC</p>

        <h1>
          Every name has
          <br />
          its own melody.
        </h1>

        <p className="subtitle">
          Turn your name into a musical composition.
        </p>
      </section>

      <section className="generator">

        <label>ENTER YOUR NAME</label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={24}
          placeholder="Type your name..."
        />

        <label>CHOOSE YOUR MOOD</label>

        <select
          value={mood}
          onChange={(e) => setMood(e.target.value as Mood)}
        >
          <option value="calm">Calm</option>
          <option value="happy">Happy</option>
          <option value="dreamy">Dreamy</option>
        </select>

        <div className="preview">
          <MusicalName
            name={name}
            mood={mood}
            darkMode={darkMode}
          />
        </div>

        <Controls name={name} mood={mood} />

      </section>

      <section className="sharing">
        <h2>Share your melody</h2>

        <p>
          Embed your interactive musical name on any website.
        </p>

        <button onClick={() => copy(embedCode)}>
          Copy Embed Code
        </button>

        <button onClick={() => copy(embedUrl)}>
          Copy Embed Link
        </button>
      </section>

      <footer>
        Made with music and imagination.
      </footer>

    </main>
  );
}