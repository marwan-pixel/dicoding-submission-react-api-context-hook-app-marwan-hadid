import React from "react";
import PropTypes from "prop-types";
import NotesBody from "../components/NotesBody";
import { deleteNotes, showFormattedDate } from "../utils";
import SearchBar from "../components/SearchBar";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
  }

  onDeleteHandler(id) {
    deleteNotes(id);
    this.props.refreshNotes();
  }

  render() {
    return (
      <section>
        <SearchBar
          keyword={this.props.keyword}
          keywordChange={this.props.keywordChange}
        />
        <NotesBody
          notes={this.props.notes}
          onDelete={this.onDeleteHandler}
          onFormattedDate={showFormattedDate}
          onArchive={this.props.onArchive}
        />
      </section>
    );
  }
}
HomePage.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  refreshNotes: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired,
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
};

export default HomePage;
