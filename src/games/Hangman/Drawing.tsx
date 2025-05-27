import { useEffect } from "react";
import clsx from "clsx";

type DrawingProps = {
  errors: number;
  className?: string;
};




export default function Drawing({ errors, className }: DrawingProps) {

  return (
    <div className={clsx("w-full flex items-center justify-center", className)}>
      <img src={`/hangman/hangman-${errors}.png`} height={150}  width={350}/>
    </div>
  )

}
