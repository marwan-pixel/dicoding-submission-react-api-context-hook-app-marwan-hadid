import { createRoot } from "react-dom/client";
import NotesApp from "./App";
import { BrowserRouter } from "react-router-dom";
// import style
import "./styles/style.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <NotesApp />
  </BrowserRouter>
);
