import React from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import NoteDetail from "../components/NoteDetail";
import { getNote } from "../utils/api";

function DetailPageWrapper() {
  const { id } = useParams();

  return <DetailPage idNote={id} />;
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: null,
      loading: true,
    };
  }

  async fetchNote() {
    this.setState({ loading: true });
    try {
      const { data } = await getNote(this.props.idNote);
      this.setState({ note: data });
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ loading: false });
    }
  }

  componentDidMount() {
    this.fetchNote();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.idNote !== this.props.idNote) {
      this.fetchNote();
    }
  }

  render() {
    return (
      <section>
        {this.state.loading ? (
          <div className="notes-app__loading">
            <p>Loading...</p>
          </div>
        ) : (
          <NoteDetail {...this.state.note} />
        )}
      </section>
    );
  }
}
DetailPage.propTypes = {
  idNote: PropTypes.string.isRequired,
};

export default DetailPageWrapper;
