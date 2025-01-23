import React from "react";

class NotesInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
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
    this.setState(() => {
      return {
        body: event.target.value,
      };
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    this.props.onAdd(this.state);
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
        <textarea
          name="catatan"
          placeholder="Tuliskan catatanmu di sini..."
          id="catatan"
          className="note-input__body"
          value={this.state.body}
          onChange={this.onBodyChangeEventHandler}
        ></textarea>
        <button onClick={this.onSubmitEventHandler}>Buat</button>
      </form>
    );
  }
}

export default NotesInput;
