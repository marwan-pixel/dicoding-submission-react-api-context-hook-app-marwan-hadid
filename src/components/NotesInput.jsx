import React from "react";
import PropTypes from "prop-types";
class NotesInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      createdAt: new Date().toISOString(),
      archived: false,
      maxCharTitle: 50,
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    const newTitle = event.target.value;
    if (newTitle.length <= this.state.maxCharTitle) {
      this.setState(() => {
        return {
          title: newTitle,
        };
      });
    }
  }

  onBodyChangeEventHandler(event) {
    this.setState({ body: event.target.innerHTML });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    const dataToSend = { ...this.state };
    delete dataToSend.maxCharTitle;
    this.props.onAdd(dataToSend);
  }

  render() {
    return (
      <form action="" className="note-input">
        <h2 className="note-input__title">Buat Catatan</h2>
        <h5 htmlFor="" className="note-input__title__char-limit ">
          Sisa Karakter: {this.state.maxCharTitle - this.state.title.length}
        </h5>
        <input
          type="text"
          placeholder="Masukkan judul..."
          id="judul"
          value={this.state.title}
          onChange={this.onTitleChangeEventHandler}
        />
        <div
          name="catatan"
          data-placeholder="Tuliskan catatanmu di sini..."
          contentEditable
          id="catatan"
          className="note-input__body"
          value={this.state.body}
          onInput={this.onBodyChangeEventHandler}
        />
        <button onClick={this.onSubmitEventHandler}>Buat</button>
      </form>
    );
  }
}
NotesInput.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default NotesInput;
