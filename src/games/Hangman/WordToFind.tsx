import clsx from "clsx";

type WordToFindProps = {
    word: { letter: string; found: boolean }[];
    className?: string
};

export default function WordToFind({ word, className }: WordToFindProps) {


    return (
        <section className={clsx("flex gap-3 w-full", className)}>
        {word.map((item, index) => (
          <div key={index} className="flex flex-col items-center w-5">
            <div className="h-6 text-lg">
              {item.found ? item.letter : ""}
            </div>
            <div className="border-t-2 border-white w-full" />
          </div>
        ))}
      </section>
    );
    
}