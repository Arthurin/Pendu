import {
  motsFaciles,
  motsMoyens,
  motsDifficiles,
  motsTresDifficiles,
} from "./dictionnaire.js";

const dictionnaire = [
  motsFaciles,
  motsMoyens,
  motsDifficiles,
  motsTresDifficiles,
];

export function getRandomWord(difficultyLevel = 1) {
  const randomIndex = Math.floor(
    Math.random() * dictionnaire[difficultyLevel].length
  );
  return dictionnaire[difficultyLevel][randomIndex];
}
