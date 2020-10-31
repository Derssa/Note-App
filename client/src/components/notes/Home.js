import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { format } from "timeago.js";
import axios from "axios";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState("");

  const getNotes = async (token) => {
    const res = await axios.get("/notes", {
      headers: { Authorization: token },
    });
    setNotes(res.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("tokenStore");
    setToken(token);
    if (token) {
      getNotes(token);
    }
  }, []);

  const deleteNote = async (id) => {
    try {
      if (token) {
        await axios.delete(`/notes/${id}`, {
          headers: { Authorization: token },
        });
        getNotes(token);
      }
    } catch (err) {
      window.location.href = "/";
    }
  };

  return (
    <div className="note_wrapper">
      {notes.length ? (
        notes.map((note) => (
          <div className="card" key={note._id}>
            <h4 title="Note Title">{note.title}</h4>
            <div className="text-wrapper">
              <p>{note.content}</p>
            </div>
            <p className="date">{format(note.date)}</p>
            <div className="card-footer">
              {note.name}
              <Link to={`/edit/${note._id}`}>Edit</Link>
            </div>
            <button className="close" onClick={() => deleteNote(note._id)}>
              x
            </button>
          </div>
        ))
      ) : (
        <h1 style={{ color: "#b3b3b3" }}>YOU NO NOTES FOR NOW</h1>
      )}
    </div>
  );
};

export default Home;
