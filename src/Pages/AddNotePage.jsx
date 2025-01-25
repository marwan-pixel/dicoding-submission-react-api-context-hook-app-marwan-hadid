import NotesInput from "../components/NotesInput";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function AddNotePage({ onAdd }) {
  const navigate = useNavigate();
  function onAddNoteHandler(note) {
    onAdd(note);
    navigate("/");
  }

  return (
    <section>
      <NotesInput onAdd={onAddNoteHandler} />
    </section>
  );
}
AddNotePage.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default AddNotePage;
