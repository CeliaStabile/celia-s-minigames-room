import Banner from "../components/Banner";
import Hangman from "../games/Hangman/Hangman";


const HangmanPage = () => {
  return (
    <section className="pb-96">
      <Banner
        title={"Hangman"}
        background={"dark"}
        description={
          "How to play : guess the hidden word without getting hanged!"
        }
        className="mt-20"
      />
      <Hangman />
    </section>
  );
};

export default HangmanPage;
