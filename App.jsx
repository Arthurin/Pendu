import React from "react";
import Key from "./Key";

export default function Pendu() {
  const [answer, setAnswer] = React.useState("pomme");
  const [guessedLetters, setGuessedLetters] = React.useState(new Set());

  const answerSet = new Set(answer);
  const wrongLetters = guessedLetters.difference(answerSet);
  const correctLetters = guessedLetters.intersection(answerSet);
  console.log("Mauvaises lettres :");
  console.log(wrongLetters);
  const endGame = gameEnded();
  const missingLetters = endGame
    ? answerSet.difference(guessedLetters)
    : new Set();
  /*
  function addLetter(letter) {
    console.log("addLetter " + letter);
    setGuessedLetters((prevArray) => {
      let newArray = [...prevArray, letter];
      console.log(new Set(newArray));
      return newArray;
    });
  }*/

  function addLetter(letter) {
    console.log("addLetter " + letter);
    setGuessedLetters((prevSet) => {
      let newSet = new Set([...prevSet, letter]);
      console.log(newSet);
      return newSet;
    });
  }

  function isWon() {
    return answerSet.isSubsetOf(guessedLetters);
  }

  // défaite à partir de la 7ème tentative
  function isLost() {
    console.log(wrongLetters.size > 6);
    return wrongLetters.size > 6;
  }

  function gameEnded() {
    console.log("game ended? " + (isWon() || isLost()));
    return isWon() || isLost();
  }

  function newGame() {
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
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
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

  return (
    <main>
      <header>
        <h1>Jeu du pendu</h1>
        <p>Devine le mot en moins de 8 essais !</p>

        <section>
          <img
            alt={`Nb d'erreur : ${wrongLetters.size}`}
            src={`/${wrongLetters.size}.jpg`}
          />
        </section>

        <section className="answer">{answerLettersElements}</section>

        {isWon() ? (
          <section className="game-status">
            <h2>Tu as gagné !</h2>
            <p>Bravo ! 🎉🥳🎉</p>
          </section>
        ) : (
          ""
        )}

        <section className="keyboard">{keyboardElements}</section>

        <button className="newGame" onClick={newGame}>
          Nouvelle partie
        </button>
      </header>
    </main>
  );
}
