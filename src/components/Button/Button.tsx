import { Link } from "react-router-dom";
import styles from "./Button.module.scss";
import type { ButtonData } from "../../types";


type ButtonProps = {
  button : ButtonData
}


export default function Button({ button }: ButtonProps) {
  const { link, text, onClick } = button

  return (
    <>
      {link ? (
        <Link to={link}>
          <button className={styles.pixelButton}>
            <p className="text-yellow-500">{text}</p>
          </button>
        </Link>
      ) : (
        <button className={styles.pixelButton} onClick={onClick}>
          <p className="text-yellow-500">{text}</p>
        </button>
      )}
    </>
  );

}
