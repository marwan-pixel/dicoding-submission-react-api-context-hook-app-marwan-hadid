import React from "react";
import NoteList from "./NoteList";
import PropTypes from "prop-types";
import NoteContext from "../contexts/NoteContext";

class NotesBody extends React.Component {
  render() {
    const { notes, onDelete, onArchive } = this.props;
    return (
      <NoteContext.Consumer>
        {({ locale }) => {
          return (
            <div className="note-app__body">
              <h2>{locale === "id" ? "Daftar Catatan" : "Notes List"}</h2>
              <NoteList
                notes={notes}
                onDelete={onDelete}
                onArchive={onArchive}
              />
            </div>
          );
        }}
      </NoteContext.Consumer>
    );
  }
}
NotesBody.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default NotesBody;
