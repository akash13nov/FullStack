import { useState } from "react";
import axios from "../node_modules/axios/lib/axios";

function App() {
  const [notes, setNotes] = useState([]);
  axios.get("http://localhost:3000/api/notes").then((res) => {
    // setNotes(res.data.notes);
  });
  return (
    <>
      <div className="notes">
        {notes.map((note) => {
          return (
            <div className="note">
              <h3>{note.title}</h3>
              <p>{note.description}</p>
              <p>{note.comment}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
