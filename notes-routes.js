import express from "express";
import cors from "cors";
import notesController from "./notes-controller.js";

// eslint-disable-next-line import/prefer-default-export
export const app = express();

app.use(express.json());
app.use(cors());

app.get("/notes", notesController.showNotes);
app.post("/notes", notesController.createNotes);
app.get("/theme", notesController.showTheme);
app.put("/theme", notesController.updateTheme);
