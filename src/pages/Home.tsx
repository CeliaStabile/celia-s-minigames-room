import React from "react";
import Button from "../components/Button/Button";
import Banner from "../components/Banner";

const button = {
  text: "Play",
  link: "/about",
};

const Home = () => {
    return (
      <>
        <Banner
          title={"Celia's minigames room"}
          background={"dark"}
          description={
            "Loren ipsum dolor sit amet, consetetuer adipiscing elit"
          }
          className="mt-20"
        />
        
      </>
    );
};

export default Home;
