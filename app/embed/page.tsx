"use client";

import { useEffect, useState } from "react";
import MusicalName from "@/components/MusicalName";
import Controls from "@/components/Controls";
import { Mood } from "@/lib/music";

export default function EmbedPage() {
  const [name, setName] = useState("Your Name");
  const [mood, setMood] = useState<Mood>("calm");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    setName(params.get("name") || "Your Name");

    const selectedMood = params.get("mood");
    if (
      selectedMood === "calm" ||
      selectedMood === "happy" ||
      selectedMood === "dreamy"
    ) {
      setMood(selectedMood);
    }
  }, []);

  return (
    <main className="embed-container">
      <MusicalName
        name={name}
        mood={mood}
        darkMode={true}
      />

      <Controls name={name} mood={mood} />
    </main>
  );
}