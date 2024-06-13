import notesService from "./notes-service.js";

const notesController = {
    showNotes: async (req, res) => {
        res.send(await notesService.dbLoadNotes());
    },
    createNotes: async (req, res) => {
        const { body } = req;
        if (JSON.stringify(body) === "{}") {
            res.sendStatus(400);
        } else if (JSON.stringify(body).slice(0, 1) !== "{") {
            res.sendStatus(400);
        } else if (!("notes" in body) || !("noteCounterId" in body)) {
            res.sendStatus(400);
        } else {
            await notesService.dbSaveNotes(body);
            res.send(body);
        }
    },
    showTheme: async (req, res) => {
        res.send(await notesService.dbLoadTheme());
    },
    updateTheme: async (req, res) => {
        const { body } = req;
        if (JSON.stringify(body) === "{}") {
            res.sendStatus(400);
        } else if (JSON.stringify(body).slice(0, 1) !== "{") {
            res.sendStatus(400);
        } else if (!("theme" in body)) {
            res.sendStatus(400);
        } else {
            await notesService.dbSaveTheme(body);
            res.send(body);
        }
    },
};

export default notesController;
