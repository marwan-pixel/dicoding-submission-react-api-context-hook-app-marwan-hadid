import React from "react";
import NotesHeader from "./NotesHeader";
import NotesBody from "./NotesBody";
import { getInitialData } from "../utils";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getInitialData(),
      filteredNotes: getInitialData(),
    };
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onAddHandler = this.onAddHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
  }
}

export default HomePage;
