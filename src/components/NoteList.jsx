import React from "react";
import PropTypes from "prop-types";
import NoteItem from "./NoteItem";

class NoteList extends React.Component {
  render() {
    const { notes, onDelete, onFormattedDate, onArchive } = this.props;
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
              onFormattedDate={onFormattedDate}
            />
          ))}
        </div>
      );
    } else {
      return <h3 className="notes-list__empty-message">Tidak Ada catatan</h3>;
    }
  }
}
NoteList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      archived: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onFormattedDate: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};
export default NoteList;
