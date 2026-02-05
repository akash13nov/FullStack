import { useEffect, useState } from "react";
import axios from "../node_modules/axios/lib/axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.notes);
      setEditingNote(null);
    });
  }
  useEffect(() => {
    fetchNotes();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (editingNote && editingNote._id) {
      axios
        .patch(
          "http://localhost:3000/api/notes/" + editingNote._id,
          editingNote,
        )
        .then(() => {
          fetchNotes();
          setEditingNote(null);
        });
    } else {
      axios.post("http://localhost:3000/api/notes", editingNote).then(() => {
        fetchNotes();
        setEditingNote(null);
      });
    }
  }

  function handleDeleteNote(noteId) {
    axios.delete("http://localhost:3000/api/notes/" + noteId).then((res) => {
      console.log(res.data);
      fetchNotes();
    });
  }

  function handleChange(e) {
    setEditingNote({
      ...editingNote,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="main">
      <form className="note-form" onSubmit={handleSubmit}>
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={editingNote?.title || ""}
          onChange={handleChange}
        />
        <input
          name="description"
          type="text"
          placeholder="Description"
          value={editingNote?.description || ""}
          onChange={handleChange}
        />
        <input
          name="comment"
          type="text"
          placeholder="Comment"
          value={editingNote?.comment || ""}
          onChange={handleChange}
        />
        <button className="btn create-btn">
          {editingNote ? "Update Note" : "Create Note"}
        </button>
      </form>

      <div className="notes">
        {notes.map((note) => {
          return (
            <div key={note._id} className="note">
              <h3>{note.title}</h3>
              <p>{note.description}</p>
              <p>{note.comment}</p>
              <button
                className="btn update-btn"
                onClick={() => setEditingNote(note)}
              >
                Update
              </button>
              <button
                className="btn delete-btn"
                onClick={() => handleDeleteNote(note._id)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
