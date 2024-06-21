import notesService from "../services/notes-service.js";
import toolsCheck from "./tools-check.js";

const filterNotes = {
    filter: "none",
    type: "filter",
};
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
        const filter = req.query.filter || "none";
        let orderID = 1;
        if (order === "descending") {
            orderID = -1;
        }
        if (filter === "none") {
            await notesService.dbFilterNone();
        }
        if (filter === "open") {
            await notesService.dbFilterNotes(true);
        }
        if (filter === "completed") {
            await notesService.dbFilterNotes(false);
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
    showFilter: async (req, res) => {
        const data = await notesService.dbLoadFilter();
        if (data === null) {
            await notesService.dbSaveFilter(filterNotes);
            const newData = await notesService.dbLoadFilter();
            res.send(newData);
        } else {
            res.send(data);
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
    updateFilter: async (req, res) => {
        const { body } = req;
        if (
            toolsCheck.emptyObject(body) ||
            toolsCheck.noObject(body) ||
            toolsCheck.noObjectProperty(body, "filter")
        ) {
            res.sendStatus(400);
        } else {
            await notesService.dbUpdateFilter(body);
            res.send(body);
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
