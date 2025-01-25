import React from "react";
import { Route, Routes } from "react-router-dom";
import DetailPage from "./Pages/DetailPage";
import HomePage from "./Pages/HomePage";
import NotFoundPage from "./Pages/NotFoundPage";
import AddNotePage from "./Pages/AddNotePage";
import ArchivedPage from "./Pages/ArchivedPage";
import Navigation from "./components/Navigation";
import { getNotes, addNotes } from "./utils";

class NotesApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getNotes(),
    };
    this.onArchiveNotesHandler = this.onArchiveNotesHandler.bind(this);
    this.refreshNotes = this.refreshNotes.bind(this);
    this.onAddNotesHandler = this.onAddNotesHandler.bind(this);
  }

  onAddNotesHandler(note) {
    const newNote = addNotes(note);
    this.setState((prevState) => ({
      notes: [...prevState.notes, newNote],
    }));
  }

  onArchiveNotesHandler(id) {
    this.setState((prevState) => {
      const updateNotes = prevState.notes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            archived: !note.archived,
          };
        }
        return note;
      });
      return { notes: updateNotes };
    });
  }

  refreshNotes() {
    this.setState({
      notes: getNotes(),
    });
  }

  render() {
    const activeNotes = this.state.notes.filter((note) => !note.archived);
    const archivedNotes = this.state.notes.filter((note) => note.archived);
    console.log(activeNotes);
    return (
      <div className="note-app">
        <header className="note-app__header">
          <h1>Aplikasi Notes</h1>
          <Navigation />
        </header>
        <main>
          {/* <NotesHeader onSearch={this.onSearchHandler} /> */}
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  notes={activeNotes}
                  refreshNotes={this.refreshNotes}
                  onArchive={this.onArchiveNotesHandler}
                />
              }
            />
            <Route path="/detailnote/:id" element={<DetailPage />} />
            <Route
              path="/archived"
              element={
                <ArchivedPage
                  notes={archivedNotes}
                  refreshNotes={this.refreshNotes}
                  onArchive={this.onArchiveNotesHandler}
                />
              }
            />
            <Route
              path="/add"
              element={<AddNotePage onAdd={this.onAddNotesHandler} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    );
  }
}

export default NotesApp;
