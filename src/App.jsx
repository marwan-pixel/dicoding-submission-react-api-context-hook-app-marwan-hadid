import React from "react";
import { Route, Routes } from "react-router-dom";
import DetailPage from "./Pages/DetailPage";
import HomePage from "./Pages/HomePage";
import NotFoundPage from "./Pages/NotFoundPage";
import AddNotePage from "./Pages/AddNotePage";
import ArchivedPage from "./Pages/ArchivedPage";
import Navigation from "./components/Navigation";
import { getNotes, addNotes } from "./utils";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

function NotesAppWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  function changeSearchParams(newKeyword) {
    setSearchParams({ keyword: newKeyword });
  }

  return (
    <NotesApp defaultKeyword={keyword} keywordChange={changeSearchParams} />
  );
}

class NotesApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getNotes(),
      keyword: props.defaultKeyword || "",
    };
    this.onArchiveNotesHandler = this.onArchiveNotesHandler.bind(this);
    this.refreshNotes = this.refreshNotes.bind(this);
    this.onAddNotesHandler = this.onAddNotesHandler.bind(this);
    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
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

  onKeywordChangeHandler(keyword) {
    this.setState(() => {
      return {
        keyword,
      };
    });

    this.props.keywordChange(keyword);
  }

  render() {
    const notes = this.state.notes.filter((note) => {
      return note.title
        .toLowerCase()
        .includes(this.state.keyword.toLowerCase());
    });

    const activeNotes = notes.filter((note) => !note.archived);
    const archivedNotes = notes.filter((note) => note.archived);
    return (
      <div className="note-app">
        <header className="note-app__header">
          <h1>Aplikasi Notes</h1>
          <Navigation />
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  notes={activeNotes}
                  refreshNotes={this.refreshNotes}
                  onArchive={this.onArchiveNotesHandler}
                  keyword={this.state.keyword}
                  keywordChange={this.onKeywordChangeHandler}
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
                  keyword={this.state.keyword}
                  keywordChange={this.onKeywordChangeHandler}
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

NotesApp.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
};

export default NotesAppWrapper;
