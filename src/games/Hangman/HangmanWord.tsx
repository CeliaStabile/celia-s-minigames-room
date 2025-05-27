import clsx from "clsx";

type HangmanWordProps = {
    word: { letter: string; found: boolean }[];
    className?: string
};

export default function HangmanWord({ word, className }: HangmanWordProps) {


    return (
        <section className={clsx("flex gap-3 w-full items-center justify-center", className)}>
        {word.map((item, index) => (
          <div key={index} className="flex flex-col items-center w-5">
            <div className="h-6 text-lg">
              {item.found ? item.letter : ""}
            </div>
            <div className="border-t-2 border-antique-white w-full" />
          </div>
        ))}
      </section>
    );
    
}