import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About"
import WordsearchPage from "../pages/WordsearchPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Layout principal
    children: [
      { path: "", element: <Home /> }, // Page d’accueil
      { path: "about", element: <About /> },
      { path: "word-search", element: <WordsearchPage /> },
    ],
  },
]);
