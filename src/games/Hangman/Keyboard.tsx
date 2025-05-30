import clsx from "clsx";
import type { GameStatus } from "@types";

type KeyboardProps = {
    onClick: (item: string) => void,
    usedLetters: string[],
    gameStatus: GameStatus,
    className?: string
};

const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export default function Keyboard({ onClick, usedLetters, gameStatus, className }: KeyboardProps) {


    return (
        <section className={clsx("flex gap-3 w-full rounded-md flex-wrap  items-center justify-center", className)}>
            
        {alphabet.map((item, index) => {
            const isAlreadyUsed = usedLetters.includes(item);
            return (
                <button
                    key={index}
                    onClick={() => onClick(item)}
                    className={clsx("border-2 border-antique-white lg:p-3 p-6", isAlreadyUsed && "border-2 border-gray-500 text-gray-500")}
                    disabled={isAlreadyUsed || gameStatus !== "pending"}
                    data-testid={`keyboard-btn`}
                >
                    {item}
                </button>
            );
        })}
      </section>
    );
    
}