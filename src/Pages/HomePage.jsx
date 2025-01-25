import React from "react";
import PropTypes from "prop-types";
import NotesBody from "../components/NotesBody";
import { showFormattedDate } from "../utils";
import SearchBar from "../components/SearchBar";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
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
          onDelete={this.props.onDelete}
          onFormattedDate={showFormattedDate}
          onArchive={this.props.onArchive}
        />
      </section>
    );
  }
}
HomePage.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onArchive: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired,
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
};

export default HomePage;
