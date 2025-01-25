import React from "react";
import NoteList from "./NoteList";
import PropTypes from "prop-types";

class NotesBody extends React.Component {
  render() {
    const { notes, onDelete, onFormattedDate, onArchive } = this.props;
    return (
      <div className="note-app__body">
        <h2>Daftar Catatan</h2>
        <NoteList
          notes={notes}
          onDelete={onDelete}
          onFormattedDate={onFormattedDate}
          onArchive={onArchive}
        />
      </div>
    );
  }
}
NotesBody.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
  onFormattedDate: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default NotesBody;
