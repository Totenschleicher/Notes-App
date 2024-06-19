import express from "express";
import cors from "cors";
import notesController from "./controllers/notes-controller.js";
import themeController from "./controllers/theme-controller.js";

// eslint-disable-next-line import/prefer-default-export
export const app = express();

app.use(express.json());
app.use(cors());

app.get("/notes", notesController.showNotes);
app.post("/notes", notesController.createNote);
app.put("/notes/:id", notesController.updateNote);
app.get("/sort", notesController.showSort);
app.put("/sort", notesController.updateSort);

app.get("/theme", themeController.showTheme);
app.put("/theme", themeController.updateTheme);
