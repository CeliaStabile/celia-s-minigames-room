import { Link } from "react-router-dom";

export default function Navbar() {
    return (
      <div className="flex justify-between">
        <Link to="/">
          <img src="/hangman.png" height={50} width={50} />
        </Link>
        <nav>
          <Link to="/about">About</Link>
        </nav>
      </div>
    );
}
