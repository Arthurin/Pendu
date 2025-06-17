import React from "react";
import Key from "./Key";

export default function Pendu() {
  const [answer, setAnswer] = React.useState("pomme");
  const [guessedLetters, setGuessedLetters] = React.useState([]);
  console.log("refresh");
  console.log(guessedLetters);

  function addLetter(letter) {
    console.log("addLetter " + letter);
    setGuessedLetters((prevArray) => {
      let newArray = [...prevArray, letter];
      console.log(newArray);
      return newArray;
    });
  }

  let answerLettersElements = answer
    .split("")
    .map((letter, index) => (
      <span key={index}>
        {guessedLetters.includes(letter) ? letter.toUpperCase() : "."}
      </span>
    ));
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let keyboardElements = alphabet
    .split("")
    .map((letter, index) => (
      <Key key={index} myLetter={letter} clickMethod={addLetter} />
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
