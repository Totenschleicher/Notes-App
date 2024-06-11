import express from "express";
import cors from "cors";

// eslint-disable-next-line import/prefer-default-export
export const app = express();

app.use(express.json());
app.use(cors());

let notesData = {
    notes: [],
    noteCounterId: 0,
    newNote: false,
    editNoteId: -1,
    theme: 0,
};

app.get("/notes", (req, res) => {
    res.send(notesData);
});

app.post("/notes", (req, res) => {
    const { body } = req;
    if (JSON.stringify(body) === "{}") {
        res.sendStatus(400);
    } else if (JSON.stringify(body).slice(0, 1) !== "{") {
        res.sendStatus(400);
    } else if (
        !("notes" in body) ||
        !("noteCounterId" in body) ||
        !("newNote" in body) ||
        !("editNoteId" in body) ||
        !("theme" in body)
    ) {
        res.sendStatus(400);
    } else {
        notesData = body;
        res.send(notesData);
    }
});
