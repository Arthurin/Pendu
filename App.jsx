import React from "react";
import Key from "./Key";

export default function Pendu() {
  const [answer, setAnswer] = React.useState("pomme");
  const [guessedLetters, setGuessedLetters] = React.useState(new Set());
  console.log(guessedLetters);

  function addLeter(letter) {
    console.log("addLetter " + letter);
    setGuessedLetters((prevArray) => {
      prevArray.add(letter);
      console.log(prevArray);
      return prevArray;
    });
  }

  let answerLettersElements = answer
    .split("")
    .map((letter, index) => (
      <span key={index}>
        {guessedLetters.has(letter) ? letter.toUpperCase() : "."}
      </span>
    ));
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let keyboardElements = alphabet
    .split("")
    .map((letter, index) => (
      <Key key={index} myLetter={letter} clickMethod={() => addLeter(letter)} />
    ));

  return (
    <main>
      <header>
        <h1>Jeu du pendu</h1>
        <p>Devine le mot en moins de 8 essais !</p>

        <section className="game-status">
          <h2>Tu as gagné !</h2>
          <p>Bravo ! 🎉🥳🎉</p>
        </section>

        <section>
          <img alt="Nb d'erreur : 0" src="/0.jpg" />
        </section>

        <section className="answer">{answerLettersElements}</section>

        <section className="keyboard">{keyboardElements}</section>

        <button className="newGame">Nouvelle partie</button>
      </header>
    </main>
  );
}
