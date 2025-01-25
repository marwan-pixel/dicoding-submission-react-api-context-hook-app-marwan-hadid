import React from "react";
import { FiTrash, FiBookmark, FiInfo } from "react-icons/fi";
import { FaBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import parser from "html-react-parser";

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
          <p className="note-item__body">{parser(body)}</p>
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
          <Link className="note-item__detail-link" to={`/detailnote/${id}`}>
            <FiInfo />
          </Link>
        </div>
      </div>
    );
  }
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onFormattedDate: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
};

export default NoteItem;
