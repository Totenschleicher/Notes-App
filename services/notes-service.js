import { db } from "./datastore.js";

const notesService = {
    dbFilterNone: async () => {
        await db.updateAsync(
            { type: "note" },
            { $set: { hidden: false } },
            { multi: true },
        );
    },
    dbFilterNotes: async (filter) => {
        await notesService.dbFilterNone();
        await db.updateAsync(
            { finished: filter },
            { $set: { hidden: true } },
            { multi: true },
        );
    },
    dbLoadNotes: async (sort, orderID) =>
        db.findAsync({ type: "note", hidden: false }).sort({ [sort]: orderID }),
    dbLoadSort: async () => db.findOneAsync({ type: "sort" }),
    dbSaveNote: async (note) => {
        try {
            await db.insertAsync(note);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    },
    dbSaveSort: async (sortNotes) => {
        try {
            await db.insertAsync(sortNotes);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    },
    dbUpdateNote: async (noteId, body) => {
        await db.updateAsync({ _id: noteId }, { $set: body }, {});
    },
    dbUpdateSort: async (sort) => {
        await db.updateAsync({ type: "sort" }, { $set: sort }, {});
    },
};

export default notesService;
