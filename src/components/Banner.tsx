import clsx from "clsx";
import type { ButtonData } from "../types";
import Button from "./Button/Button";
import GameCard from "./GameCard";


type BannerProps = {
    title?: string,
    description?: string,
    button?: ButtonData
    background: "dark" | "light"
    className?: string
    games?: boolean
}

export default function Banner({ title, description, button, background = "dark", games = false, className }: BannerProps) {

  return (
    <section
      className={clsx(
        background === "light" ? "bg-blue-900" : "bg-indigo-950",
        "w-full py-10 lg:py-20 px-5 flex flex-col items-center justify-center text-center gap-12 lg:gap-20",
        className
      )}
    >
      <div className="flex flex-col gap-8">
        {title && <h1 className="text-3xl pixel-shadow uppercase">{title}</h1>}
        {description && <p>{description}</p>}
        {button && <Button button={button} />}
      </div>
      {games && (
        <div className="flex flex-col lg:flex-row gap-8 px-5 flex-wrap items-center justify-center">
          <GameCard
            title={"word search"}
            image={"/wordsearch.png"}
            link={"/word-search"}
          />
          <GameCard
            title={"hangman"}
            image={"/hangman.png"}
            link={"/hangman"}
          />
          {/* <GameCard
            title={"tic tac toe"}
            image={"/tictactoe.png"}
            link={"/wordsearch"}
          /> */}
        </div>
      )}
    </section>
  );
}
