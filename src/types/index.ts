export type ButtonData = {
  link?: string;
  text: string;
  onClick?: () => void;
};

export type GameStatus =  "pending" | "win" | "lose"