
const About = () => {
  return (
    <section className="pb-96 pt-20">
      <div className="w-full py-10 lg:py-20 px-10 flex  flex-col lg:flex-row lg:items-start items-center text-center lg:text-left justify-center  gap-12 lg:gap-20 bg-indigo-900 ">
        <img className="lg:w-1/2" src="/portrait.png" />
        <div className="lg:w-1/2 flex flex-col gap-5">
          <h1 className="pixel-shadow text-3xl">Hi, I'm Celia</h1>
          <p className="text-xs lg:text-sm">
            Loren ipsum dolor sit amet, consetetuer adipiscing elit Loren ipsum
            dolor sit amet, consetetuer adipiscing elit Loren ipsum dolor sit
            amet, consetetuer adipiscing elit Loren ipsum dolor sit amet,
            consetetuer adipiscing elit Loren ipsum dolor sit amet, consetetuer
            adipiscing elit
          </p>
          <p className="text-xs lg:text-sm">
            Loren ipsum dolor sit amet, consetetuer adipiscing elit Loren ipsum
            dolor sit amet, consetetuer adipiscing elit Loren ipsum dolor sit
            amet, consetetuer adipiscing elit Loren ipsum dolor sit amet,
            consetetuer adipiscing elit Loren ipsum dolor sit amet, consetetuer
            adipiscing elit
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;