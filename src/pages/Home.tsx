import React from "react";
import Button from "../components/button";

const Home = () => {
    return (
      <section className="flex flex-col gap-5 items-center justify-center">
            <p>Home</p>
          <Button text={"Play"} link={"/"} />  
      </section>
    );
};

export default Home;
