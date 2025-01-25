import React from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import NoteDetail from "../components/NoteDetail";
import { getNotes, showFormattedDate } from "../utils";
import { useNavigate } from "react-router-dom";

function DetailPageWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();

  return <DetailPage id={id} navigate={navigate} />;
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: getNotes(props.id),
    };
  }

  render() {
    if (!this.state.note) {
      this.props.navigate("/");
      return null;
    }

    return (
      <section>
        <NoteDetail {...this.state.note} onFormattedDate={showFormattedDate} />
      </section>
    );
  }
}
DetailPage.propTypes = {
  id: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default DetailPageWrapper;
