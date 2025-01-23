import React from "react";
import NotesInput from "./NotesInput";
import NoteList from "./NoteList";
import ArchivedList from "./ArchivedList";

class NotesBody extends React.Component {
  render() {
    const { notes, onDelete, onFormattedDate, onAdd, onArchive } = this.props;

    const activeNotes = notes.filter((note) => !note.archived);
    // Filter untuk catatan yang sudah diarsipkan
    const archivedNotes = notes.filter((note) => note.archived);
    return (
      <div className="note-app__body">
        <NotesInput onAdd={onAdd} />
        <h2>Catatan Aktif</h2>
        <NoteList
          notes={activeNotes}
          onDelete={onDelete}
          onFormattedDate={onFormattedDate}
          onArchive={onArchive}
        />
        <h2>Arsip</h2>
        <ArchivedList
          notes={archivedNotes}
          onDelete={onDelete}
          onFormattedDate={onFormattedDate}
          onArchive={onArchive}
        />
      </div>
    );
  }
}

export default NotesBody;
