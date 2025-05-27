import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HangmanWord from "./HangmanWord";
 


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

// describe("Keyboard", () => {
//   it("renders underscores if letter not found, but shows letter if it's found", () => {
//       const mockUsedLetters = [
//           "A", "B","C"
//     ];

//     render(<Keyboard usedLetters={mockUsedLetters}/>);

//     expect(screen.queryByText("A")).not.toBeInTheDocument();
//     expect(screen.queryByText("B")).not.toBeInTheDocument();
//     expect(screen.queryByText("C")).toBeInTheDocument();
//   });
// });
