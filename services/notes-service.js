import { db } from "./datastore.js";

const notesService = {
    dbDeleteNote: async (id) => {
        await db.removeAsync({ _id: id }, {});
    },
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
    dbLoadFilter: async () => db.findOneAsync({ type: "filter" }),
    dbLoadSort: async () => db.findOneAsync({ type: "sort" }),
    dbSaveNote: async (note) => {
        try {
            await db.insertAsync(note);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    },
    dbSaveFilter: async (filterNotes) => {
        try {
            await db.insertAsync(filterNotes);
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
    dbUpdateFilter: async (filter) => {
        await db.updateAsync({ type: "filter" }, { $set: filter }, {});
    },
    dbUpdateSort: async (sort) => {
        await db.updateAsync({ type: "sort" }, { $set: sort }, {});
    },
};

export default notesService;
