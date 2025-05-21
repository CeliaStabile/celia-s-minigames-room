import { Link } from "react-router-dom";

type ButtonProps =
{ link: string,
  text: string
}

export default function Button ({link, text} : ButtonProps) {

    return (
      <button className="bg-pink-600 px-5 py-2 border-4 border-yellow-500  hover:bg-pink-400  
      ">
        <p className="text-yellow-500">{text}</p>
      </button>
    );

}
