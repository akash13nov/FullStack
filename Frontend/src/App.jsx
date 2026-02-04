import { useState } from "react";

function App() {
  const [notes, setNotes] = useState([
    {
      title: "test title 1",
      description: "test description 1",
    },
    {
      title: "test title 2",
      description: "test description 2",
    },
    {
      title: "test title 3",
      description: "test description 3",
    },
    {
      title: "test title 4",
      description: "test description 4",
    },
  ]);
  return (
    <>
      <div className="notes">
        <div className="note">
          <h3>title</h3>
          <p>description</p>
          <p>comment</p>
        </div>
      </div>
    </>
  );
}

export default App;
