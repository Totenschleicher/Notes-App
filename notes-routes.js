import express from "express";
import cors from "cors";
import notesController from "./notes-controller.js";

// eslint-disable-next-line import/prefer-default-export
export const app = express();

app.use(express.json());
app.use(cors());

app.get("/notes", notesController.showNotesData);
app.post("/notes", notesController.createNotesData);
