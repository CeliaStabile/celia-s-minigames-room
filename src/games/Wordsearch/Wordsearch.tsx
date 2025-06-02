import { useState, useEffect } from "react";
import wordsearchData from "../../data/wordsearchdata.json";
import Button from "@components/Button/Button";
import EndOfGameAnim from "@components/EndOfGameAnim";
import WordList from "./WordList";
import Grid from "./Grid";
import type { GameStatus, Word, Position } from "@types";

export default function WordSearch() {
  //define grid and words
  const [levelIndex, setLevelIndex] = useState<number>(0);
  const currentLevel = wordsearchData[levelIndex];
  const [wordList, setWordList] = useState<Word[]>(
    currentLevel.words.map((w) => ({ word: w, found: false }))
  );
  const grid = currentLevel.grid;

  //manage cells
  const [startCell, setStartCell] = useState<Position | null>(null);
  const [endCell, setEndCell] = useState<Position | null>(null);
  const [selectedCells, setSelectedCells] = useState<Position[] | null>(null);
  const [winningSelectedCells, setWinningSelectedCells] = useState<
    Position[] | null
  >(null);
  const [usedCells, setUsedCells] = useState<Position[] | null>(null);
  const [gameStatus, setGameStatus] = useState<GameStatus>("pending");

  //Record selected start and end cells coordinates
  function handleStartClick(x: number, y: number) {
    if (!startCell) {
      setStartCell([x, y]);
    } else if (!endCell) {
      setEndCell([x, y]);
    } else {
      setStartCell([x, y]);
      setEndCell(null);
    }
  }

  //main function : extract the word out of start and end cells coordinates
  function extractWord(
    startCell: Position,
    endCell: Position,
    grid: string[][]
  ): null | { word: string; path: Position[] } {
    //destructurer les positions de start et end
    const [startRow, startCol] = startCell;
    const [endRow, endCol] = endCell;

    //déterminer les directions du mot
    //résultats possibles : 1 (avancer), -1 reculer, 0 ne pas bouger
    const rowDir = Math.sign(endRow - startRow);
    const colDir = Math.sign(endCol - startCol);

    //définir les distances pour confirmer les diagonales
    const rowDiff = Math.abs(endRow - startRow);
    const colDiff = Math.abs(endCol - startCol);

    //s'assurer que c'est bien une ligne droite (verticale, horizontale ou diagonale)
    const isStraightLine = rowDir === 0 || colDir === 0 || rowDiff === colDiff;
    if (!isStraightLine) {
      console.warn("Choisissez ligne droite");
      return null;
    }

    let word = "";
    let currentRow = startRow;
    let currentCol = startCol;
    const path: Position[] = [];

    //reconstituer le mot entre les deux cellules de début et de fin
    while (currentRow !== endRow + rowDir || currentCol !== endCol + colDir) {
      word += grid[currentRow][currentCol];
      path.push([currentRow, currentCol]);
      currentRow += rowDir;
      currentCol += colDir;
    }

    return { word, path };
  }

  function findWord(word: string): boolean {
    //reverse le mot pour s'il a été trouvé à l'envers
    const reversed = word.split("").reverse().join("");

    //vérifier si le mot ou le mot à l'envers existe dans wordList et renvoyer ce mot
    const foundWord = wordList.find(
      (item) => item.word === word || item.word === reversed
    );

    //s'il existe
    if (foundWord && !foundWord.found) {
      //modifier word list quand on trouve le mot, changer found en true
      setWordList((prev) =>
        prev.map((item) =>
          item.word === foundWord.word ? { ...item, found: true } : item
        )
      );
      return true;
    }

    return false;
  }

  //appliquer extractWord, findWord et mettre à jour selectedCells quand on clique
  useEffect(() => {
    if (endCell && startCell) {
      //récupérer le mot sélectionné par l'utilisateur
      const result = extractWord(startCell, endCell, grid);

      //vérifier si dans la liste et allumer les cellules
      if (result) {
        const isWordFound = findWord(result.word);

        //si le mot est dans la liste, cellules en jaunes, sinon cellules en gris
        if (isWordFound) {
          setWinningSelectedCells(result.path);
          setUsedCells((prev) => [...(prev ?? []), ...result.path]);
        } else {
          setSelectedCells(result.path);
        }
      }

      //réinitialiser après 3 secondes
      const timeOut = setTimeout(() => {
        setStartCell(null);
        setEndCell(null);
        setSelectedCells(null);
        setWinningSelectedCells(null);
      }, 1000);

      return () => clearTimeout(timeOut);
    }
  }, [endCell]);

  //check when user won
  useEffect(() => {
    if (wordList.every((word) => word.found)) setGameStatus("win");
  }, [wordList]);

  //update wordlist when level change
  useEffect(() => {
    setWordList(currentLevel.words.map((w) => ({ word: w, found: false })));
  }, [levelIndex]);

  function handlePlayAgainClick() {
    setLevelIndex((level) => (level + 1) % wordsearchData.length);
    setGameStatus("pending");
    setUsedCells(null);
    setStartCell(null);
    setEndCell(null);
    setSelectedCells(null);
    setWinningSelectedCells(null);
  }

  const playAgainButton = {
    onClick: handlePlayAgainClick,
    text: "Play Again",
  };

  return (
    <>
      <section className="p-10 flex flex-col items-center justify-center bg-blue-900 text-xs lg:text-sm relative ">
        <div className="relative  z-20">
          <Grid
            selectedCells={selectedCells}
            usedCells={usedCells}
            winningSelectedCells={winningSelectedCells}
            startCell={startCell}
            handleClick={handleStartClick}
            grid={grid}
          />
          <EndOfGameAnim gameStatus={gameStatus} />
        </div>
      </section>
      <section className="bg-indigo-950 p-10">
        <WordList wordList={wordList} />
        <div className="flex gap-5 items-center justify-center">
          <Button className="mt-8" button={playAgainButton} />
        </div>
      </section>
    </>
  );
}
