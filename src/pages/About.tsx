
const About = () => {
  return (
    <section className="pb-96 pt-20">
      <div className="w-full py-10 lg:py-20 px-10 flex  flex-col lg:flex-row  items-center text-center lg:text-left justify-center  gap-12 lg:gap-20 bg-indigo-900 ">
        <img className="lg:w-1/2" src="/portrait.png" />
        <div className="lg:w-1/2 flex flex-col gap-8">
          <h1 className="pixel-shadow text-3xl">Hi, I'm Celia</h1>
          <div className="flex flex-col gap-3 text-left">
            <p className="text-xs lg:text-sm">
              Welcome to my little corner of the internet!
            </p>
            <p className="text-xs lg:text-sm">
              This site is a playful space where you can enjoy mini-games in a
              nostalgic, retro-inspired atmosphere.
            </p>
            <p className="text-xs lg:text-sm">
              I hope the vibe brings you some joy and a bit of childhood magic
              ✨
            </p>
            <p className="text-xs lg:text-sm">
              Feel free to explore the games, and if you're curious about how
              everything works behind the scenes, the full code is available on
              my
              <a
                href="https://github.com/CeliaStabile/celia-s-minigames-room"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {" "}
                GitHub
              </a>
              .
            </p>
            <p className="text-xs lg:text-sm">
              You can also connect with me on
              <a
                href="https://www.linkedin.com/in/celia-stabile-b6653b63/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {" "}
                Linkedin
              </a>{" "}
              — I’d love to hear from you!
            </p>
            <p className="text-xs lg:text-sm">
              Have fun and thanks for stopping by 👾
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;