import React from "react";
import PropTypes from "prop-types";
import NotesBody from "../components/NotesBody";
import { deleteNotes, showFormattedDate } from "../utils";
import SearchBar from "../components/SearchBar";
import { useSearchParams, useNavigate } from "react-router-dom";

function HomePageWrapper(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const keyword = searchParams.get("keyword") || "";

  if (!props.notes || props.notes.length === 0) {
    navigate("/404");
    return null;
  }

  function changeSearchParams(newKeyword) {
    setSearchParams({ keyword: newKeyword });
  }

  return (
    <HomePage
      defaultKeyword={keyword}
      keywordChange={changeSearchParams}
      {...props}
    />
  );
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: props.defaultKeyword || "",
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  onDeleteHandler(id) {
    deleteNotes(id);
    this.props.refreshNotes();
  }

  onKeywordChangeHandler(keyword) {
    this.setState(() => {
      return {
        keyword,
      };
    });

    this.props.keywordChange(keyword);
  }

  render() {
    const notes = this.props.notes.filter((note) => {
      return note.title
        .toLowerCase()
        .includes(this.state.keyword.toLowerCase());
    });

    return (
      <section>
        <SearchBar
          keyword={this.state.keyword}
          keywordChange={this.onKeywordChangeHandler}
        />
        <NotesBody
          notes={notes}
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
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
};

HomePageWrapper.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default HomePageWrapper;
