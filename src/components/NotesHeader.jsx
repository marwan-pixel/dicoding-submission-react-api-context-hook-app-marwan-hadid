import React from "react";
import PropTypes from 'prop-types';

class NotesHeader extends React.Component {
  constructor(props) {
    super(props);

    this.onSearchEventHandler = this.onSearchEventHandler.bind(this);
  }

  onSearchEventHandler(event) {
    const title = event.target.value;
    this.props.onSearch(title);
  }
  render() {
    return (
      <div className="note-app__header">
        <h1>Notes App</h1>

        <input
          type="text"
          className="note-search"
          placeholder="Cari catatan..."
          onChange={this.onSearchEventHandler}
        />
      </div>
    );
  }
}
NotesHeader.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default NotesHeader;
