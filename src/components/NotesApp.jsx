import React from "react";
import { Route, Routes } from "react-router-dom";
import DetailPage from "../Pages/DetailPage";
import HomePage from "../Pages/HomePage";
import NotesHeader from "./NotesHeader";
import NotesBody from "./NotesBody";
import { getNotes, deleteNotes } from "../utils";

function NotesApp() {}

class NotesApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getNotes(),
      archivedNotes: getInitialData(),
    };
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onAddHandler = this.onAddHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
  }

  onAddHandler({ title, body }) {
    const currentTime = new Date().toISOString();
    const newNote = {
      id: +new Date(),
      title,
      body,
      createdAt: currentTime,
      archived: false,
    };
    this.setState((prevState) => {
      return {
        notes: [...prevState.notes, newNote],
        archivedNotes: [...prevState.archivedNotes, newNote],
      };
    });
  }

  onDeleteHandler(id) {
    deleteNotes(id);
    this.setState(() => {
      return {
        notes: getNotes(),
      };
    });
  }

  onArchiveHandler(id) {
    this.setState((prevState) => {
      const updateNotes = prevState.archivedNotes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            archived: !note.archived,
          };
        }
        return note;
      });
      return { archivedNotes: updateNotes };
    });
  }

  onSearchHandler(title) {
    const archivedNotes = this.state.notes.filter((note) =>
      note.title.toLowerCase().includes(title.toLowerCase())
    );
    this.setState({
      archivedNotes,
    });
  }
  render() {
    return (
      <div>
        <NotesHeader onSearch={this.onSearchHandler} />
        <NotesBody
          notes={this.state.archivedNotes}
          onDelete={this.onDeleteHandler}
          onFormattedDate={showFormattedDate}
          onAdd={this.onAddHandler}
          onArchive={this.onArchiveHandler}
        />
      </div>
    );
  }
}

export default NotesApp;
