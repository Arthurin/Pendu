import {
  motsFaciles,
  motsDifficiles,
  motsTresDifficiles,
} from "./dictionnaire.js";

const dictionnaire = [motsFaciles, motsDifficiles, motsTresDifficiles];

export function getRandomWord(difficultyLevel = 1) {
  const randomIndex = Math.floor(
    Math.random() * dictionnaire[difficultyLevel].length
  );
  return dictionnaire[difficultyLevel][randomIndex];
}
