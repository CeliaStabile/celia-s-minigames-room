import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import HangmanWord from "./HangmanWord";
import Hangman from "./Hangman";

vi.mock("../../data/hangmandata.json", () => ({
  default: ["ABC"],
}));

describe("HangmanWord", () => {
  it("renders underscores if letter not found, but shows letter if it's found", () => {
    const mockWord = [
      { letter: "A", found: false },
      { letter: "B", found: false },
      { letter: "C", found: true },
    ];

    render(<HangmanWord word={mockWord} revealAll={false} />);

    expect(screen.queryByText("A")).not.toBeInTheDocument();
    expect(screen.queryByText("B")).not.toBeInTheDocument();
    expect(screen.queryByText("C")).toBeInTheDocument();
  });
});

describe("Hangman", () => {
  it("shows a different Drawing image if a wrong letter is clicked", () => {
    render(<Hangman />);
    const wrongLetter = screen.getByText("Z");
    fireEvent.click(wrongLetter);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "/hangman/hangman-1.png");
  });

  it("shows a disabled keyword button when a letter is clicked", () => {
    render(<Hangman />);
    const clickedLetter = screen.getByRole("button", { name: "Z" });

    fireEvent.click(clickedLetter);

    expect(clickedLetter).toBeDisabled;
  });

  it("shows winning animation when all letters are found", () => {
    render(<Hangman />);

    ["A", "B", "C"].forEach((letter) => {
      fireEvent.click(screen.getByRole("button", { name: letter }));
    });

    expect(screen.getByText(/you win/i)).toBeInTheDocument();
  });

  it("shows losing animation when there are 7 errors", () => {
    render(<Hangman />);

    ["E", "F", "G", "H", "I", "J", "K"].forEach((letter) => {
      fireEvent.click(screen.getByRole("button", { name: letter }));
    });

    expect(screen.getByText(/you lose/i)).toBeInTheDocument();
  });

  it("resets word, image and keyboard when play again button is clicked", () => {
    render(<Hangman />);

    fireEvent.click(screen.getByText("Play again"));

    //reset image
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "/hangman/hangman-0.png");

    //reset keyboard
    const keywordButtons = screen.getAllByTestId("keyboard-btn");
    keywordButtons.forEach((btn) => {
      expect(btn).not.toBeDisabled();
    });

    //reset word
    const revealedLetters = screen.queryAllByTestId("word-letter");
    revealedLetters.forEach((letter) => {
      expect(letter.textContent).toBe(""); 
    });

  });
});
