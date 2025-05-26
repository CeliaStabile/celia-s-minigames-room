import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About"
import WordsearchPage from "../pages/WordsearchPage";
import Error from "../pages/Error";
import HangmanPage
  from "../pages/HangmanPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Layout principal
    errorElement: <Error />,
    children: [
      { path: "", element: <Home /> }, // Page d’accueil
      { path: "about", element: <About /> },
      { path: "word-search", element: <WordsearchPage /> },
      { path: "hangman", element: <HangmanPage/> },
    ],
  },
]);
