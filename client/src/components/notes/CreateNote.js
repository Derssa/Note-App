import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const CreateNote = () => {
  const [note, setNote] = useState({
    title: "",
    content: "",
    date: "",
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const createNote = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const { title, content, date } = note;
        await axios.post(
          `/notes`,
          {
            title,
            content,
            date,
          },
          {
            headers: { Authorization: token },
          }
        );

        return history.push("/");
      }
    } catch (err) {
      window.location.href = "/";
    }
  };

  return (
    <div className="create_note_container">
      <form className="creat_note_form">
        <h3>Create Note</h3>
        <div className="row">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Note Title"
            value={note.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">
          <label htmlFor="title">Content</label>
          <textarea
            name="content"
            id="content"
            rows="10"
            placeholder="Note Title"
            value={note.content}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">
          <label htmlFor="title">Date: {note.date}</label>
          <input
            type="date"
            name="date"
            id="date"
            required
            onChange={handleChange}
          />
        </div>
        <button type="submit" onClick={createNote}>
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
