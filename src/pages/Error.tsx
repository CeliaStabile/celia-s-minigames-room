import Button from "../components/Button/Button";

const button = {
  link: "/",
  text: "Play",
};

export default function Error() {
  return (
    <div className="h-screen w-full overflow-x-hidden flex items-center justify-center flex-col text-center p-10 gap-8">
      <h1 className="mb-4 pixel-shadow uppercase text-3xl">Oh no! You lost yourself in space</h1>
      <p className="text-lg">Nothing to see here, go back to the games</p>
      <Button button={button} />
    </div>
  );
}
