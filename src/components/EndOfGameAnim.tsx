import type { GameStatus } from "../types";
import clsx from "clsx";

type EndOfGameAnimProps = {
  gameStatus: GameStatus;
  className?: string;
};

//

/**
 * Always use "relative" attribute to parent component to get a correct display
 */
export default function EndOfGameAnim({
  gameStatus,
  className,
}: EndOfGameAnimProps) {
  return (
    <div className={className}>
      {gameStatus !== "pending" && (
        <p
          style={{ top: "35%", left: "54%" }}
          className={clsx(
            "animate-retro-drop-in pixel-shadow text-5xl z-50 absolute text-center",

            gameStatus === "lose" && "text-red-600"
          )}
        >
          {gameStatus === "win" ? "You win!" : "You lose..."}
        </p>
      )}
    </div>
  );
}
