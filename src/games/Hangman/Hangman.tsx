import { useState, useEffect } from "react";
import wordData from "../../data/hangmandata.json";
import WordToFind from "./WordToFind";
import Keyboard from "./Keyboard";
import Drawing from "./Drawing";

export default function Hangman() {
  //word to find is an object : {letter : a, found; false}. Provient d'une liste de mot stockée dans data, au hasard
  const [randomWordIndex, setRandomWordIndex] = useState<number>(
    Math.floor(Math.random() * wordData.length)
  );
  const currentWord = wordData[randomWordIndex];
  const [wordToFind, setWordToFind] = useState<
    { letter: string; found: boolean }[]
  >([...currentWord].map((letter) => ({ letter: letter, found: false })));

  //stocker lettre de l'utilisateur
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  //stocker la liste des lettres déja utilisées
  const [usedLetters, setUsedLetters] = useState<string[] | []>([]);

  //compteur d'erreur de l'utilisateur
  const [userErrors, setUserErrors] = useState(0);

  //Game status : perdu, gagné
  const [gameStatus, setGameStatus] = useState<string | null>(null);

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

  // useEffect(() => (
  //     //vérifier si toutes les lettres de word to find sont found true.
  //     setGameStatus("win")

  //     //vérifier si le nombre d'erreurs = 7. Si 7, lancer loose animation
  //     setGameStatus("lose")
  // ), [userErrors, wordToFind]);

  //button play again

  function handlePlayAgainClick() {
    //reset tous les states
    //set wordToFind même chose qu'au début, random mot, transformer en objet avec found false
  }

  return (
    <div className="p-10 flex flex-col items-center justify-center bg-blue-900 text-xs lg:text-sm relative gap-5">
      {/* Composant word to find. 
        Map sur wordTofind.letter. Si found -> display block, sinon display hidden et trait en dessous de la lettre */}
      <WordToFind word={wordToFind} />
      {/* composant hangManDrawing ? ou le faire ici directement ?  */}
      {/* passer à hangManDrawing le nombre d'erreurs, et en fonction du nombre, afficher ou non la partie. Ex : si userError = 1,
        afficher la potence + la corde, si 2, la potence, la corde + la tête etc */}

      {/* Clavier */}
      <Keyboard onClick={handleLetterClick} usedLetters={usedLetters} />
      {/* Map sur lettres de l'alphabet dans des boutons (dans data par ex). On click : handleLetterClick
        Si la lettre fait partie de usedLetter, bouton disabled. */}
      
      <Drawing error={userErrors} />

      {/* end of game animation  */}
      {/* si gameStatus n'est pas null
      title : gameStatus === win ? "You win!" : "You lose!" */}

      {/* bouton play again */}
      {/* on click : handlePlayAgainClick */}
    </div>
  );
}
