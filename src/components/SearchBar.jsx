import PropTypes from "prop-types";
import NoteContext from "../contexts/NoteContext";

function SearchBar({ keyword, keywordChange }) {
  return (
    <NoteContext.Consumer>
      {({ locale }) => {
        return (
          <div className="note-app__header">
            <input
              type="text"
              className="note-search"
              placeholder={
                locale === "id" ? "Cari catatan..." : "Search notes..."
              }
              value={keyword}
              onChange={(event) => keywordChange(event.target.value)}
            />
          </div>
        );
      }}
    </NoteContext.Consumer>
  );
}

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};

export default SearchBar;
