import notesService from "../services/notes-service.js";
import toolsCheck from "./tools-check.js";

const sortNotes = {
    sort: "creationDate",
    order: "ascending",
    type: "sort",
};

const notesController = {
    checkFields: (body) =>
        toolsCheck.emptyObject(body) ||
        toolsCheck.noObject(body) ||
        toolsCheck.noObjectProperty(body, "creationDate") ||
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
        const sort = req.query.sort || "creationDate";
        const order = req.query.order || "ascending";
        let orderID = 1;
        if (order === "descending") {
            orderID = -1;
        }
        res.send(await notesService.dbLoadNotes(sort, orderID));
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
    showSort: async (req, res) => {
        const data = await notesService.dbLoadSort();
        if (data === null) {
            await notesService.dbSaveSort(sortNotes);
            const newData = await notesService.dbLoadSort();
            res.send(newData);
        } else {
            res.send(data);
        }
    },
    updateSort: async (req, res) => {
        const { body } = req;
        if (
            toolsCheck.emptyObject(body) ||
            toolsCheck.noObject(body) ||
            toolsCheck.noObjectProperty(body, "sort") ||
            toolsCheck.noObjectProperty(body, "order")
        ) {
            res.sendStatus(400);
        } else {
            await notesService.dbUpdateSort(body);
            res.send(body);
        }
    },
};

export default notesController;
