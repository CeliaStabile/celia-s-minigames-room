import { useState, useEffect } from "react";
import clsx from "clsx";
import { motion } from "motion/react";

type Position = [number, number];
type Word = { word: string; found: boolean };

export default function WordSearch() {
  const [start, setStart] = useState<Position | null>(null);
  const [end, setEnd] = useState<Position | null>(null);
  const [selectedCells, setSelectedCells] = useState<Position[] | null>(null);
  const [winningSelectedCells, setWinningSelectedCells] = useState<
    Position[] | null
  >(null);

  const [wordList, setWordList] = useState<Word[]>([
    { word: "POXITO", found: false },
    { word: "EMILIA", found: false },
    { word: "BRAIN", found: false },
    { word: "CEREAL", found: false },
    { word: "SHOP", found: false },
    { word: "COOL", found: false },
    { word: "HOPE", found: false },
    { word: "MONKS", found: false },
    { word: "CAKE", found: false },
    { word: "EASE", found: false },
  ]);

  const grid = [
    ["P", "O", "X", "I", "T", "O", "E", "A", "S", "E"],
    ["D", "E", "G", "G", "S", "Y", "E", "H", "H", "N"],
    ["B", "R", "C", "I", "H", "O", "M", "E", "O", "T"],
    ["R", "O", "P", "E", "U", "L", "I", "R", "P", "S"],
    ["A", "E", "R", "E", "R", "L", "L", "G", "U", "H"],
    ["I", "C", "S", "P", "S", "E", "I", "P", "M", "O"],
    ["N", "N", "K", "S", "L", "O", "A", "H", "C", "P"],
    ["E", "K", "N", "O", "N", "O", "M", "L", "E", "E"],
    ["E", "M", "O", "L", "C", "A", "K", "E", "D", "R"],
    ["S", "C", "M", "D", "Y", "X", "Y", "Z", "U", "Q"],
  ];

  function handleClick(x: number, y: number) {
    if (!start) {
      setStart([x, y]);
    } else if (!end) {
      setEnd([x, y]);
    } else {
      setStart([x, y]);
      setEnd(null);
    }
  }

  //déduire le mot sélectionné selon les positions de start et end
  function extractWord(
    start: Position,
    end: Position,
    grid: string[][]
  ): null | { word: string; path: Position[] } {
    //destructurer les positions de start et end
    const [startRow, startCol] = start;
    const [endRow, endCol] = end;

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
    if (end && start) {
      //récupérer le mot sélectionné par l'utilisateur
      const result = extractWord(start, end, grid);

      //vérifier si dans la liste et allumer les cellules
      if (result) {
        const isWordFound = findWord(result.word);

        //si le mot est dans la liste, cellules en jaunes, sinon cellules en gris
        if (isWordFound) {
          setWinningSelectedCells(result.path);
        } else {
          setSelectedCells(result.path);
        }
      }

      //réinitialiser après 3 secondes
      const timeOut = setTimeout(() => {
        setStart(null);
        setEnd(null);
        setSelectedCells(null);
        setWinningSelectedCells(null);
      }, 1000);

      return () => clearTimeout(timeOut);
    }
  }, [end]);

  return (
    <section className="p-10 flex flex-col items-center justify-center">
      <h1 className="mb-8">Word Search</h1>

      {grid.map((row, x) => (
        <div key={x} className="flex cursor-pointer">
          {row.map((cell, y) => {
            //fait partie du mot sélectionné mais pas dans la liste
            const isSelected =
              selectedCells &&
              selectedCells.some(([row, col]) => row === x && col === y);

            //fait partie d'un mot dans la liste
            const isWinning =
              winningSelectedCells &&
              winningSelectedCells.some(([row, col]) => row === x && col === y);

            //est la première cellule cliquée
            const isStart = start?.[0] === x && start?.[1] === y;

            return (
              <motion.div
                className={clsx([
                  "border-1 border-black w-10 h-10 flex justify-center items-center",
                  isSelected
                    ? "bg-red-300"
                    : isWinning
                    ? "bg-yellow-500"
                    : "hover:bg-gray-200",
                ])}
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
      <div className="flex gap-5 mt-5">
        {wordList.map((word, i) => (
          <motion.p
            key={i}
            className={clsx(word.found && "line-through")}
            animate={word.found ? { scale: [1, 1.3, 1] } : undefined}
          >
            {word.word}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
