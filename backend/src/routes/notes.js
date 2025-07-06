const express = require("express");
const notesRouter = express.Router();
const connection = require("../database");
const jwt = require("jsonwebtoken");

// DASHBOARD PO LOGINIE
notesRouter.get("/", (req, res) => {
  if (!req.headers.authorization) return res.sendStatus(401);
  const [type, token] = req.headers.authorization?.split(" ");

  if (type !== "Bearer") return res.sendStatus(401);

  const { id } = jwt.decode(token);

  connection.query(
    "SELECT * FROM notes WHERE user_id = ?",
    [id],
    (err, result) => {
      res.status(200).json(result);
    }
  );
});

// POJEDYNCZA NOTATKA
notesRouter.get("/:id", (req, res) => {
  const noteId = req.params.id;
  const [type, token] = req.headers.authorization?.split(" ");
  const { id } = jwt.decode(token);

  if (type !== "Bearer") return res.sendStatus(401);

  connection.query(
    "SELECT * FROM notes WHERE id = ?",
    [noteId],
    (err, result) => {
      const note = result[0];

      if (!note || note.user_id !== id) res.status(404).send("Note not found");
      else res.status(200).json(result);
    }
  );
});

// TWORZENIE NOTATKI
notesRouter.post("/", (req, res) => {
  const [type, token] = req.headers.authorization?.split(" ");
  const { id } = jwt.decode(token);

  if (type !== "Bearer") return res.sendStatus(401);

  const data = {
    user_id: id,
    title: req.body.title,
    content: req.body.content,
  };

  connection.query(
    "INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)",
    [data.user_id, data.title, data.content],
    (err, result) => {
      res.status(200).json(result);
    }
  );

  connection.query(
    "SELECT id FROM (user_id, title, content) VALUES (?, ?, ?)",
    [data.user_id, data.title, data.content],
    (err, result) => {
      res.status(200).json(result);
    }
  );
});

// EDYCJA NOTATKI
notesRouter.put("/:id", (req, res) => {
  const noteId = req.params.id;
  const [type, token] = req.headers.authorization?.split(" ");
  const { id } = jwt.decode(token);

  if (type !== "Bearer") return res.sendStatus(401);

  const data = {
    user_id: id,
    title: req.body.title,
    content: req.body.content,
  };

  connection.query(
    "UPDATE notes SET user_id=?, title=?, content=? WHERE id = ?",
    [data.user_id, data.title, data.content, noteId],
    (err, result) => {
      res.status(200).json(result);
    }
  );
});

// USUWANIE NOTATKI
notesRouter.delete("/:id", (req, res) => {
  const noteId = req.params.id;
  const [type, token] = req.headers.authorization?.split(" ");
  const { id } = jwt.decode(token);

  if (type !== "Bearer") return res.sendStatus(401);

  connection.query(
    "DELETE FROM notes WHERE id=? AND user_id=?",
    [noteId, id],
    (err, result) => {
      res.status(200).json(result);
    }
  );
});

module.exports = notesRouter;
