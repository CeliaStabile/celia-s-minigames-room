import { useState, useEffect } from "react";
import wordData from "../../data/hangmandata.json";
import HangmanWord from "./HangmanWord";
import Keyboard from "./Keyboard";
import Drawing from "./Drawing";
import Button from "../../components/Button/Button";
import type { GameStatus } from "../../types";

export default function Hangman() {
  const [randomWordIndex, setRandomWordIndex] = useState<number>(
    Math.floor(Math.random() * wordData.length)
  );
  const currentWord = wordData[randomWordIndex];
  const [wordToFind, setWordToFind] = useState<
    { letter: string; found: boolean }[]
  >([...currentWord].map((letter) => ({ letter: letter, found: false })));

  //stocker la liste des lettres déja utilisées
  const [usedLetters, setUsedLetters] = useState<string[] | []>([]);

  //compteur d'erreur de l'utilisateur
  const [userErrors, setUserErrors] = useState(0);

  //Game status : perdu, gagné
  const [gameStatus, setGameStatus] = useState<GameStatus>("pending");

  const button = {
    text: "Play again",
    onClick: handlePlayAgainClick,
  };

  console.log(wordToFind);
  //on click sur clavier function :
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

  useEffect(() => {
    // vérifier si toutes les lettres de word to find sont found true.
    if (wordToFind.every((word) => word.found)) setGameStatus("win");

    if (userErrors > 6) setGameStatus("lose");
  }, [userErrors, wordToFind]);

  //button play again
  function handlePlayAgainClick() {
    setUsedLetters([]);
    setUserErrors(0);
    setGameStatus("pending");
    setRandomWordIndex(Math.floor(Math.random() * wordData.length));
    setWordToFind(
      [...currentWord].map((letter) => ({ letter: letter, found: false }))
    );
  }

  return (
    <div className="p-10 flex flex-col items-center justify-center bg-blue-900 text-xs lg:text-sm relative gap-10">
      <Drawing errors={userErrors} className={"w-1/2"} />
      <HangmanWord word={wordToFind} />
      <Keyboard
        onClick={handleLetterClick}
        usedLetters={usedLetters}
        gameStatus={gameStatus}
        className="lg:w-2/3 mb-6 "
      />

      {gameStatus !== "pending" && (
        <p
          style={{ top: "35%", left: "54%" }}
          className=" animate-retro-drop-in pixel-shadow text-5xl z-50 absolute text-center  "
        >
          {gameStatus === "win" ? "You win!" : "You lose..."}
        </p>
      )}

      <Button button={button} />

    </div>
  );
}
