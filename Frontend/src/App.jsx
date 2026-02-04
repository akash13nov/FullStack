import { useEffect, useState } from "react";
import axios from "../node_modules/axios/lib/axios";

function App() {
  const [notes, setNotes] = useState([]);
  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  }
  useEffect(() => {
    fetchNotes();
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    const { title, description, comment } = e.target.elements;
    console.log(title.value, description.value, comment.value);

    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
        comment: comment.value,
      })
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });
  }
  function handleDeleteNote(noteId) {
    axios.delete("http://localhost:3000/api/notes/" + noteId).then((res) => {
      console.log(res.data);
      fetchNotes();
    });
  }
  return (
    <>
      <form className="note-form" onSubmit={handleSubmit}>
        <input name="title" type="text" placeholder="Title" />
        <input name="description" type="text" placeholder="Description" />
        <input name="comment" type="text" placeholder="Comment" />
        <button className="update-btn">Create note</button>
      </form>

      <div className="notes">
        {notes.map((note, idx) => {
          return (
            <div key={idx} className="note">
              <h3>{note.title}</h3>
              <p>{note.description}</p>
              <p>{note.comment}</p>
              <button
                className="delete-btn"
                onClick={() => {
                  handleDeleteNote(note._id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
