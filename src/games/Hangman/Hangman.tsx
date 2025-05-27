import { useState, useEffect } from "react";
import wordData from "../../data/hangmandata.json";
import HangmanWord from "./HangmanWord";
import Keyboard from "./Keyboard";
import Drawing from "./Drawing";
import Button from "../../components/Button/Button";
import type { GameStatus } from "../../types";
import EndOfGameAnim from "../../components/EndOfGameAnim";

//generate a word in the data list and give back an object for the game
function generateWord(): { letter: string; found: boolean }[] {
  const word = wordData[Math.floor(Math.random() * wordData.length)];
  return [...word].map((letter) => ({ letter, found: false }));
}

export default function Hangman() {
  const [wordToFind, setWordToFind] = useState<
    { letter: string; found: boolean }[]
  >(() => generateWord());

  //stocker la liste des lettres déja utilisées
  const [usedLetters, setUsedLetters] = useState<string[] | []>([]);

  //compteur d'erreur de l'utilisateur
  const [userErrors, setUserErrors] = useState(0);

  //Game status : perdu, gagné
  const [gameStatus, setGameStatus] = useState<GameStatus>("pending");

  //Reveal all : show the word when you loose
  const [revealLetters, setRevealLetters] = useState<boolean>(false);

  const button = {
    text: "Play again",
    onClick: handlePlayAgainClick,
  };

  console.log("feel like cheating? The word is: ", wordToFind);
 

  function handleLetterClick(letter: string) {
    setUsedLetters((prev) => [...prev, letter]);

    //check if letter is in the word to find
    const isLetterInWord = wordToFind.some((item) => item.letter === letter);
    if (isLetterInWord) {
      //update the letter in wordToFind as found
      const updatedWord = wordToFind.map((item) =>
        item.letter === letter ? { ...item, found: true } : item
      );

      setWordToFind(updatedWord);
    } else {
      setUserErrors((prev) => prev + 1);
    }
  }

  //check gameStatus: is the word found ? Or are there too many mistakes
  useEffect(() => {
    if (wordToFind.every((word) => word.found)) setGameStatus("win");

    if (userErrors > 6) {
      setGameStatus("lose");
      setRevealLetters(true);
    }
  }, [userErrors, wordToFind]);

  //button play again that resets everything
  function handlePlayAgainClick() {
    setUsedLetters([]);
    setUserErrors(0);
    setGameStatus("pending");
    setRevealLetters(false);
    setWordToFind(generateWord());
  }

  return (
    <div className="p-10 flex flex-col items-center justify-center bg-blue-900 text-xs lg:text-sm relative gap-5">
      <Drawing errors={userErrors} className={"w-1/2"} />
      <HangmanWord
        revealAll={revealLetters}
        word={wordToFind}
        className="mb-5"
      />
      <Keyboard
        onClick={handleLetterClick}
        usedLetters={usedLetters}
        gameStatus={gameStatus}
        className="lg:w-2/3 "
      />
      <EndOfGameAnim gameStatus={gameStatus} />
      <Button button={button} />
    </div>
  );
}
