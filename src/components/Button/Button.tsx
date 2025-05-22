import { Link } from "react-router-dom";
import styles from "./Button.module.scss";
import type { ButtonData } from "../../types";
import clsx from "clsx";


type ButtonProps = {
  button: ButtonData
  className?: string
}


export default function Button({ button, className }: ButtonProps) {
  const { link, text, onClick } = button

  return (
    <>
      {link ? (
        <Link to={link}>
          <button className={clsx(styles.pixelButton, className)}>
            <p className="text-yellow-500">{text}</p>
          </button>
        </Link>
      ) : (
        <button
          className={clsx(styles.pixelButton, className)}
          onClick={onClick}
        >
          <p className="text-yellow-500">{text}</p>
        </button>
      )}
    </>
  );

}
