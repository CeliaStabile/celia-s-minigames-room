import { useState, useEffect } from "react";
import clsx from "clsx";
import { motion } from "motion/react";
import wordsearchData from "../../data/wordsearchdata.json"
import Button from "../../components/Button/Button";

type Position = [number, number];
type Word = { word: string; found: boolean };

export default function WordSearch() {
  //define grid and words
  const [levelIndex, setLevelIndex] = useState<number>(0)
  const currentLevel = wordsearchData[levelIndex]
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
  const [userWon, setUserWon] = useState(false);


  //Record selected start and end cells coordinates
  function handleClick(x: number, y: number) {
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
    if (wordList.every((word) => word.found)) setUserWon(true);
  }, [wordList]);

  //update wordlist when level change
  useEffect(() => {
    setWordList(currentLevel.words.map((w) => ({ word: w, found: false })));
  }, [levelIndex]);



  function handlePlayAgainClick() {
   setLevelIndex((level) => (level + 1) % wordsearchData.length)
    setUserWon(false);
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
          {grid.map((row, x) => (
            <div key={x} className="flex cursor-pointer ">
              {row.map((cell, y) => {
                //cell has been selected by user but word is not in wordlist
                const isSelected =
                  selectedCells &&
                  selectedCells.some(([row, col]) => row === x && col === y);

                //cell is selected and word is in word list
                const isWinning =
                  winningSelectedCells &&
                  winningSelectedCells.some(
                    ([row, col]) => row === x && col === y
                  );

                //cell has been used to find a word
                const hasBeenUsed =
                  usedCells &&
                  usedCells.some(([row, col]) => row === x && col === y);

                //is the first cell
                const isStart = startCell?.[0] === x && startCell?.[1] === y;

                let cellBackground = "";

                if (isWinning) {
                  cellBackground = "bg-yellow-500";
                } else if (isSelected) {
                  cellBackground = "bg-red-300";
                } else if (hasBeenUsed) {
                  cellBackground = "bg-indigo-950";
                } else {
                  cellBackground = "hover:bg-blue-400";
                }

                return (
                  <motion.div
                    className={clsx([
                      "border-1 border-black w-9 h-9 flex justify-center items-center pixel-clean",
                      cellBackground,
                    ])}
                    data-testid={`cell-${x}-${y}`}
                    key={y}
                    onClick={() => handleClick(x, y)}
                    animate={
                      isWinning
                        ? { scale: [1, 1.3, 1] }
                        : isSelected
                        ? { x: [-5, 5, -5, 5, 0] }
                        : isStart
                        ? { scale: [1, 1.15, 1] }
                        : undefined
                    }
                    transition={{
                      duration: 0.4,
                      ease: isWinning ? "easeInOut" : undefined,
                    }}
                  >
                    <p> {cell}</p>
                  </motion.div>
                );
              })}
            </div>
          ))}
          {userWon && (
            <p
              style={{ top: "35%", left: "54%" }}
              className=" animate-retro-drop-in pixel-shadow text-5xl z-50 absolute  "
            >
              You win!
            </p>
          )}
        </div>
      </section>
      <section className="bg-indigo-950 p-10">
        <div className="flex gap-5  flex-wrap justify-center">
          {wordList.map((word, i) => (
            <motion.p
              key={i}
              className={clsx(word.found && "text-yellow-500 underline", "pixel-clean")}
              animate={word.found ? { scale: [1, 1.3, 1] } : undefined}
            
            >
              {word.word}
            </motion.p>
          ))}
        </div>
        <div className="flex gap-5 items-center justify-center">
          <Button           className="mt-8" button={playAgainButton} />
       
        </div>
      </section>
    </>
  );
}
