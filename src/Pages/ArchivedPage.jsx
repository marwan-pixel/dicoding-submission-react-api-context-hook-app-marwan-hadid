import NotesBody from "../components/NotesBody";
import SearchBar from "../components/SearchBar";
import { getArchivedNotes, unArchiveNote, deleteNote } from "../utils/api";
import useNotes from "../hooks/useNotes";

function ArchivedPage() {
  const {
    notes,
    keyword,
    loading,
    onKeywordChangeHandler,
    onDeleteHandler,
    onArchiveHandler,
  } = useNotes(getArchivedNotes, deleteNote, unArchiveNote);
  return (
    <section>
      {loading ? (
        <div className="notes-app__loading">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
          <NotesBody
            notes={notes}
            onDelete={onDeleteHandler}
            onArchive={onArchiveHandler}
          />
        </>
      )}
    </section>
  );
}

export default ArchivedPage;
