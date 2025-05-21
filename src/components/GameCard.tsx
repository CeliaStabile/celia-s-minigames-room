//props : name, image, link
import Button from "./Button/Button";

type GameCardProps = {
  title: string;
  image: string;
  link: string;
};

export default function GameCard({ title, image, link }: GameCardProps) {
  const button = {
    text: "Play",
    link: link,
  };

  return (
    <div className="bg-indigo-950 border-4 border-yellow-500  w-56 lg:w-80 p-6 text-center flex flex-col gap-5">
      <p className="text-xl pixel-shadow uppercase">{title}</p>
      <img src={image} />
      <Button button={button} />
    </div>
  );
}
