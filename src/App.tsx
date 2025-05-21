import { Outlet, Link } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <p className="text-xs pb-10 text-center"> © Celia Stabile - 2025</p>
    </div>
  );
}
