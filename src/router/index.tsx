import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About"
import WordSearch from "../games/Wordsearch"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Layout principal
    children: [
      { path: "", element: <Home /> }, // Page d’accueil
      { path: "about", element: <About /> },
      { path: "word-search", element: <WordSearch /> },
    ],
  },
]);
