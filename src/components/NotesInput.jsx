import React from "react";
import PropTypes from "prop-types";
import NoteContext from "../contexts/NoteContext";
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
      <NoteContext.Consumer>
        {({ locale }) => {
          return (
            <form action="" className="note-input">
              <h2 className="note-input__title">
                {locale === "id" ? "Buat Catatan" : "Create Note"}
              </h2>
              <h5 htmlFor="" className="note-input__title__char-limit ">
                {locale === "id" ? "Sisa Karakter: " : "Characters Remaining: "}
                {this.state.maxCharTitle - this.state.title.length}
              </h5>
              <input
                type="text"
                placeholder={
                  locale === "id" ? "Masukkan judul..." : "Insert the title..."
                }
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
              <button onClick={this.onSubmitEventHandler}>
                {" "}
                {locale === "id" ? "Buat" : "Create"}
              </button>
            </form>
          );
        }}
      </NoteContext.Consumer>
    );
  }
}
NotesInput.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default NotesInput;
