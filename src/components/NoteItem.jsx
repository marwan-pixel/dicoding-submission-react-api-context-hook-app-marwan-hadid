import React from "react";
import { FiTrash, FiBookmark, FiInfo } from "react-icons/fi";
import { FaBookmark } from "react-icons/fa";
class NoteItem extends React.Component {
  render() {
    const {
      id,
      onDelete,
      onArchive,
      onFormattedDate,
      title,
      createdAt,
      body,
      archived,
    } = this.props;
    return (
      <div className="note-item">
        <div className="note-item__content">
          <h3 className="note-item__title">{title}</h3>
          <p className="note-item__date ">{onFormattedDate(createdAt)}</p>
          <p className="note-item__body">{body}</p>
        </div>
        <div className="note-item__action">
          <button
            className="note-item__delete-button"
            onClick={() => onDelete(id)}
          >
            <FiTrash />
          </button>
          <button
            className="note-item__archive-button "
            onClick={() => onArchive(id)}
          >
            {archived ? <FaBookmark /> : <FiBookmark />}
          </button>
          <button
            className="note-item__detail-button "
            onClick={() => onArchive(id)}
          >
            <FiInfo />
          </button>
        </div>
      </div>
    );
  }
}

export default NoteItem;
