import React from "react";
import { useSearchParams } from "react-router-dom";

function useNotes(getNotes, deleteNote, archiveNote) {
  const [notes, setNotes] = React.useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = React.useState(
    () => searchParams.get("keyword") || ""
  );
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchNotesData() {
      try {
        setLoading(true);
        const { data } = await getNotes();
        setNotes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchNotesData();
  }, [getNotes]);

  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  async function onDeleteHandler(id) {
    await deleteNote(id);
    const { data } = await getNotes();
    setNotes(data);
  }

  async function onArchiveHandler(id) {
    await archiveNote(id);
    const { data } = await getNotes();
    setNotes(data);
  }

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return {
    notes: filteredNotes,
    keyword,
    loading,
    onKeywordChangeHandler,
    onDeleteHandler,
    onArchiveHandler,
  };
}

export default useNotes;
