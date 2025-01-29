import React from "react";
import PropTypes from "prop-types";
import parser from "html-react-parser";

class NoteDetail extends React.Component {
  render() {
    const { title, createdAt, body } = this.props;
    return (
      <div className="note-app__body">
        <div className="note-item">
          <div className="note-item__content">
            <h1 className="note-detail__title">{title}</h1>
            <p className="note-detail__date ">{createdAt}</p>
            <p className="note-detail__body">{parser(body)}</p>
          </div>
        </div>
      </div>
    );
  }
}

NoteDetail.propTypes = {
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default NoteDetail;
