/**
 * Server ko create krna
 */

const express = require("express");
const noteModel = require("./models/note.model");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
/**
 * http://localhost:3000/assets/index-CuruXpPN.js
 * http://localhost:3000/assets/index-CTP9n18l.css
 */
app.use(express.static("./public"));

/**
 * POST /api/notes
 * req.body => {title,description}
 */
app.post("/api/notes", async (req, res) => {
  const { title, description, comment } = req.body;

  const note = await noteModel.create({ title, description, comment });

  res.status(201).json({
    message: "Note created successfully",
    note,
  });
});

/**
 * GET /api/notes
 * Fetch all the notes data from mongodb and send them in the response
 */
app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    message: "Notes fetched successfully",
    notes,
  });
});

/**
 * DELETE /api/notes/:id
 * Delete note with the id from req.params
 */
app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);

  await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Note deleted successfully",
  });
});

/**
 * PATCH /api/notes/:id
 * Update the description of the note by id
 * req.body = {description}
 */
app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { description, comment } = req.body;

  await noteModel.findByIdAndUpdate(id, { description, comment });

  res.status(200).json({
    message: "Note updated successfully",
  });
});

console.log(__dirname);

app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});
module.exports = app;
