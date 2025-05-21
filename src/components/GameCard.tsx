
//props : name, image, link
import Button from "./Button/Button";

type GameCardProps = {
    title: string,
    image: string,
    link: string,
}



export default function GameCard({ title, image, link }: GameCardProps) {

    const button = {
        text: "Play",
        link: link
    };
    

  return (
    <div className="bg-indigo-900 border-3 border-yellow-500">
          <p>{title}</p>
          <img src={image} />
<Button button={button} />
    </div>
  );

}
