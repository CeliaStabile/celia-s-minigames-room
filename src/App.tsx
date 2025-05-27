import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <p className="text-xs pb-10 text-center"> © Celia Stabile - 2025</p>
    </div>
  );
}
