import { createRoot } from "react-dom/client";
import NotesAppWrapper from "./App";
import { BrowserRouter } from "react-router-dom";
// import style
import "./styles/style.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <NotesAppWrapper />
  </BrowserRouter>
);
