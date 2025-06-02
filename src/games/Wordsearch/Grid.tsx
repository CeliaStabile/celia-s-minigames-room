import { useState, useEffect } from "react";
import clsx from "clsx";
import { motion } from "motion/react";
import type { Position } from "@types";

type GridProps = {
  grid: string[][];
  selectedCells: Position[] | null;
  winningSelectedCells: Position[] | null;
  usedCells: Position[] | null;
  startCell: Position | null;
  handleClick: (x: number, y: number) => void;
};

export default function Grid({
  selectedCells,
  winningSelectedCells,
  usedCells,
  startCell,
  handleClick,
  grid,
}: GridProps) {
  return (
    <>
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
              winningSelectedCells.some(([row, col]) => row === x && col === y);

            //cell has been used to find a word
            const hasBeenUsed =
              usedCells &&
              usedCells.some(([row, col]) => row === x && col === y);

            //is the first cell
            const isStart = startCell?.[0] === x && startCell?.[1] === y;

            let cellBackground = "";
            if (isWinning) {
              cellBackground = "z-10 bg-yellow-500";
            } else if (isSelected) {
              cellBackground = "z-10 bg-red-300";
            } else if (isStart) {
              cellBackground = "z-0 bg-blue-400";
            } else if (hasBeenUsed) {
              cellBackground = "z-0 bg-indigo-950";
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
    </>
  );
}
