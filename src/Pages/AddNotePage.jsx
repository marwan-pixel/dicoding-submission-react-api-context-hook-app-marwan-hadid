import NotesInput from "../components/NotesInput";
import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/api";

function AddNotePage() {
  const navigate = useNavigate();

  async function onAddNoteHandler(note) {
    await addNote(note);
    navigate("/");
  }

  return (
    <section>
      <NotesInput onAdd={onAddNoteHandler} />
    </section>
  );
}

export default AddNotePage;
