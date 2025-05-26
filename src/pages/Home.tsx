import React from "react";
import Button from "../components/Button/Button";
import Banner from "../components/Banner";
import GameCard from "../components/GameCard";

const button = {
  text: "Play",
  link: "/about",
};

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
