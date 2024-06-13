import notesService from "../services/notes-service.js";
import toolsCheck from "./tools-check.js";

const notesController = {
    checkFields: (body) =>
        toolsCheck.emptyObject(body) ||
        toolsCheck.noObject(body) ||
        toolsCheck.noObjectProperty(body, "description") ||
        toolsCheck.noObjectProperty(body, "dueDate") ||
        toolsCheck.noObjectProperty(body, "finished") ||
        toolsCheck.noObjectProperty(body, "hidden") ||
        toolsCheck.noObjectProperty(body, "importance") ||
        toolsCheck.noObjectProperty(body, "title") ||
        toolsCheck.noObjectProperty(body, "type"),
    createNote: async (req, res) => {
        const { body } = req;
        if (notesController.checkFields(body)) {
            res.sendStatus(400);
        } else {
            await notesService.dbSaveNote(body);
            res.send(body);
        }
    },
    showNotes: async (req, res) => {
        res.send(await notesService.dbLoadNotes());
    },
    updateNote: async (req, res) => {
        const { body } = req;
        const noteId = req.params.id;
        if (notesController.checkFields(body)) {
            res.sendStatus(400);
        } else {
            await notesService.dbUpdateNote(noteId, body);
            res.send(body);
        }
    },
};

export default notesController;
