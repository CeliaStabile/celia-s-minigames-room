import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import WordSearch from "./Wordsearch";

vi.mock("../../data/wordsearchdata.json", () => {
  return {
    default: [
      {
        grid: [
          ["C", "A", "T"],
          ["J", "T", "I"],
          ["D", "O", "E"],
        ],
        words: ["CAT", "TIE"],
      },
      {
        grid: [
          ["D", "U", "C"],
          ["K", "S", "Y"],
          ["Q", "R", "Z"],
        ],
        words: ["DUC"],
      },
    ],
  };
});

describe("WordSearch", () => {
  it("finds horizontal word", async () => {
    render(<WordSearch />);

    fireEvent.click(screen.getByTestId("cell-0-0"));
    fireEvent.click(screen.getByTestId("cell-0-2"));

    const winningCell = screen.queryByTestId("cell-0-1");
    expect(winningCell).toHaveClass("bg-yellow-500");

    expect(screen.getByText("CAT")).toHaveClass("text-yellow-500", "underline");
  });

  it("show user word selected is wrong", async () => {
    render(<WordSearch />);

    fireEvent.click(screen.getByTestId("cell-1-0"));
    fireEvent.click(screen.getByTestId("cell-1-2"));

    const wrongCell = screen.queryByTestId("cell-1-1");
    expect(wrongCell).toHaveClass("bg-red-300");
  });

  it("doesn't take into account misaligned word", async () => {
    render(<WordSearch />);

    fireEvent.click(screen.getByTestId("cell-0-0")); // C
    fireEvent.click(screen.getByTestId("cell-1-1")); // T

    const clickedCell = screen.queryByTestId("cell-0-1");
    expect(clickedCell).not.toHaveClass("bg-yellow-500");
    expect(clickedCell).not.toHaveClass("bg-red-300");
  });

  it("shows you win animation when user finds all words", async () => {
    render(<WordSearch />);

    // CAT
    fireEvent.click(screen.getByTestId("cell-0-0")); // C
    fireEvent.click(screen.getByTestId("cell-0-2")); // T

    // TIE
    fireEvent.click(screen.getByTestId("cell-0-2")); // D
    fireEvent.click(screen.getByTestId("cell-2-2")); // G

    expect(screen.getByText(/you win/i)).toBeInTheDocument();
  });

  it("change grid and words when clicking 'Play Again'", () => {
    render(<WordSearch />);

    expect(screen.getByTestId("cell-0-0")).toHaveTextContent("C");

    fireEvent.click(screen.getByRole("button", { name: /play again/i }));

    expect(screen.getByTestId("cell-0-0")).toHaveTextContent("D");
    expect(screen.getByText("DUC")).toBeInTheDocument();
  });
});
