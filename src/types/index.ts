export type ButtonData = {
  link?: string;
  text: string;
  onClick?: () => void;
};

export type GameStatus = "pending" | "win" | "lose"

export type Word = { word: string; found: boolean };

export type Position = [number, number];