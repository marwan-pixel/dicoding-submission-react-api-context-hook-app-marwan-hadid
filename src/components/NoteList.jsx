import React from "react";
import PropTypes from "prop-types";
import NoteItem from "./NoteItem";
import NoteContext from "../contexts/NoteContext";

class NoteList extends React.Component {
  render() {
    const { notes, onDelete, onArchive } = this.props;
    if (notes.length > 0) {
      return (
        <div className="notes-list">
          {notes.map((note) => (
            <NoteItem
              key={note.id}
              id={note.id}
              onDelete={onDelete}
              {...note}
              onArchive={onArchive}
            />
          ))}
        </div>
      );
    } else {
      return (
        <NoteContext.Consumer>
          {({ locale }) => {
            return (
              <h3 className="notes-list__empty-message">
                {locale === "id" ? "Tidak Ada catatan" : "Notes are empty"}
              </h3>
            );
          }}
        </NoteContext.Consumer>
      );
    }
  }
}
NoteList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      archived: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};
export default NoteList;
