import clsx from "clsx";

type KeyboardProps = {
    onClick: (item: string) => void,
    usedLetters: string[],
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

export default function Keyboard({ onClick, usedLetters, className }: KeyboardProps) {


    return (
        <section className={clsx("flex gap-3 w-full rounded-md flex-wrap  items-center justify-center", className)}>
        {alphabet.map((item, index) => {
            const isAlreadyUsed = usedLetters.includes(item);
            return (
                <button
                    key={index}
                    onClick={() => onClick(item)}
                    className={clsx("border-2 border-white p-3", isAlreadyUsed && "border-2 border-gray-600")}
                    disabled={isAlreadyUsed}
                >
                    {item}
                </button>
            );
        })}
      </section>
    );
    
}