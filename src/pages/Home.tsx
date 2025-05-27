import Banner from "../components/Banner";
;

const Home = () => {
  return (
    <section className="pb-96">
      <Banner
        title={"Celia's minigames room"}
        background={"dark"}
        description={"Pick a game, press start, and let the fun begin."}
        className="mt-20"
      />
      <Banner title={"Choose your game"} background={"light"} games />
    </section>
  );
};

export default Home;
