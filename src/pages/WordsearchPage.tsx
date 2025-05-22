import Button from "../components/Button/Button";
import Banner from "../components/Banner";
import WordSearch from "../games/Wordsearch";


const button = {
  text: "Play",
  link: "/about",
};

const WordsearchPage = () => {
  return (
    <section className="pb-96">
      <Banner
        title={"Word search"}
        background={"dark"}
        description={
          "How to play :  find all the hidden words in the letter grid. Words may be placed horizontally, vertically, or diagonally — and forward or backward!"
        }
        className="mt-20"
      />
      <WordSearch />
    </section>
  );
};

export default WordsearchPage;
