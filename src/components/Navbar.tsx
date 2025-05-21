import { Link } from "react-router-dom";

export default function Navbar() {
    return (
      <div className="flex justify-between items-start m-7">
        <Link to="/">
          <img src="/logo.png" className="w-20 lg:w-28" height={100} width={150} />
        </Link>
        <nav>
          <Link to="/about">About</Link>
        </nav>
      </div>
    );
}
