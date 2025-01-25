import PropTypes from "prop-types";

function SearchBar({ keyword, keywordChange }) {
  return (
    <div className="note-app__header">
      <input
        type="text"
        className="note-search"
        placeholder="Cari catatan..."
        value={keyword}
        onChange={(event) => keywordChange(event.target.value)}
      />
    </div>
  );
}

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};

export default SearchBar;
