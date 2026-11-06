export type Mood = "calm" | "happy" | "dreamy";

const scales: Record<Mood, number[]> = {
  calm: [261.63, 293.66, 329.63, 392, 440],
  happy: [329.63, 392, 440, 523.25, 587.33],
  dreamy: [220, 261.63, 329.63, 392, 493.88],
};

export function generateMelody(
  name: string,
  mood: Mood = "calm"
) {
  const scale = scales[mood];

  return name
    .toUpperCase()
    .split("")
    .filter((char) => char >= "A" && char <= "Z")
    .map((char) => {
      const index = char.charCodeAt(0) - 65;

      return {
        letter: char,
        frequency: scale[index % scale.length],
        noteIndex: index % scale.length,
      };
    });
}