const express = require("express");
const notesRouter = express.Router();
const connection = require("../database");

notesRouter.get("/", (req, res) => {
    connection.query("SELECT * FROM notes", [], (err, result) => {
        res.status(200).json(result);
    })
});

notesRouter.get("/:id", (req, res) => {
    const noteId = req.params.id;

    connection.query("SELECT * FROM notes WHERE id = ?", [noteId], (err, result) => {
        const note = result[0];
        if(!note)
            res.status(404).send("Note not found");
        else
            res.status(200).json(result);
    })
});

module.exports = notesRouter;