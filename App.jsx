import React from "react";
import Key from "./Key";
import { getRandomWord } from "./utils";
import { clsx } from "clsx";

export default function Pendu() {
  // Arrow function pour éviter d'executer getRandomWord() à chaque rafraîchissement
  const [difficultyLevel, setDifficultyLevel] = React.useState(0);
  const [answer, setAnswer] = React.useState(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = React.useState(new Set());

  const answerSet = new Set(answer);
  const wrongLetters = guessedLetters.difference(answerSet);
  /**
   * Si on utilisait un tableau on aurait pu utiliser filter() par exemple :
  const wrongGuessCount = guessedLetters.filter( letter => !answer.includes(letter)).length
   */

  const correctLetters = guessedLetters.intersection(answerSet);
  const endGame = gameEnded();
  const missingLetters = endGame
    ? answerSet.difference(guessedLetters)
    : new Set();

  function addLetter(letter) {
    setGuessedLetters((prevSet) => {
      let newSet = new Set([...prevSet, letter]);
      return newSet;
    });
  }

  function isWon() {
    return answerSet.isSubsetOf(guessedLetters);
  }

  // défaite à partir de la 7ème tentative
  function isLost() {
    return wrongLetters.size > 6;
  }

  function gameEnded() {
    return isWon() || isLost();
  }

  function newGame(difficulty = 1) {
    setDifficultyLevel(difficulty);
    setAnswer(getRandomWord(difficulty));
    setGuessedLetters(new Set());
  }

  let answerLettersElements = answer.split("").map((letter, index) => (
    <span
      key={index}
      style={{
        color: missingLetters.has(letter) ? "rgb(216, 89, 89)" : "white",
      }}
    >
      {guessedLetters.has(letter)
        ? letter.toUpperCase()
        : isLost()
        ? letter.toUpperCase()
        : ""}
    </span>
  ));

  // Petite amélioration de fin de projet : j'ai décomposé rapidemment en 3 lignes pour faire un affichage qui ressemble au clavier azerty
  const alphabet = "azertyuiop";
  const alphabet2 = "qsdfghjklm";
  const alphabet3 = "wxcvbn";
  //const alphabet = "abcdefghijklmnopqrstuvwxyz";

  let keyboardElements = alphabet
    .split("")
    .map((letter, index) => (
      <Key
        key={index}
        myLetter={letter}
        endGame={endGame}
        letterColor={
          wrongLetters.has(letter)
            ? "rgb(255, 76, 44)"
            : correctLetters.has(letter)
            ? "rgb(38, 174, 81)"
            : "rgb(255, 188, 44)"
        }
        clickMethod={addLetter}
      />
    ));

  let keyboardElements2 = alphabet2
    .split("")
    .map((letter, index) => (
      <Key
        key={index}
        myLetter={letter}
        endGame={endGame}
        letterColor={
          wrongLetters.has(letter)
            ? "rgb(255, 76, 44)"
            : correctLetters.has(letter)
            ? "rgb(38, 174, 81)"
            : "rgb(255, 188, 44)"
        }
        clickMethod={addLetter}
      />
    ));

  let keyboardElements3 = alphabet3
    .split("")
    .map((letter, index) => (
      <Key
        key={index}
        myLetter={letter}
        endGame={endGame}
        letterColor={
          wrongLetters.has(letter)
            ? "rgb(255, 76, 44)"
            : correctLetters.has(letter)
            ? "rgb(38, 174, 81)"
            : "rgb(255, 188, 44)"
        }
        clickMethod={addLetter}
      />
    ));

  return (
    <main>
      <header>
        <h1>Jeu du pendu</h1>
        <p>
          Devine le mot, tu peux faire au maximum 7 erreurs avant d'être pendu !
        </p>
      </header>

      <section>
        <img
          alt={`Nb d'erreur : ${wrongLetters.size}`}
          src={`/${wrongLetters.size}.jpg`}
        />
      </section>

      <section className="answer">{answerLettersElements}</section>

      {/**
       * Accessibilité :
       *  + ajout du role="status"
       *  + aria-live permet de dire au screen-reader d'attendre d'afficher le reste du contenu lorsqu'il y a un nouveau render
       *  - on pourrait améliorer l'app et faire encore plus accessible
       */}
      {isWon() && (
        <section className="game-status" aria-live="polite" role="status">
          <h2>Tu as gagné !</h2>
          <p>Bravo ! 🎉🥳🎉</p>
        </section>
      )}

      <section className="keyboard">{keyboardElements}</section>
      <section className="keyboard">{keyboardElements2}</section>
      <section className="keyboard">{keyboardElements3}</section>

      <div className="nouvellePartie">
        <h2>Nouvelle partie</h2>
      </div>
      <section className="difficulte">
        <button
          className={clsx("difficultyLevel", "middle", {
            isPressed: difficultyLevel == 0,
          })}
          onClick={() => newGame(0)}
        >
          Niveau Moyen
        </button>
        <button
          className={clsx(
            "difficultyLevel",
            "hard",
            difficultyLevel == 1 && "isPressed"
          )}
          onClick={() => newGame(1)}
        >
          Niveau Difficile
        </button>
        <button
          className={clsx(
            "difficultyLevel",
            "veryHard",
            difficultyLevel == 2 && "isPressed"
          )}
          onClick={() => newGame(2)}
        >
          Niveau Hardcore
        </button>
      </section>
    </main>
  );
}
