import { db } from "./datastore.js";

const notesService = {
    dbLoadNotes: async (sort, orderID) =>
        db.findAsync({ type: "note" }).sort({ [sort]: [orderID] }),
    dbSaveNote: async (note) => {
        try {
            await db.insertAsync(note);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    },
    dbUpdateNote: async (noteId, body) => {
        await db.updateAsync({ _id: noteId }, { $set: body }, {});
    },
    dbLoadSort: async () => db.findOneAsync({ type: "sort" }),
    dbSaveSort: async (sortNotes) => {
        try {
            await db.insertAsync(sortNotes);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    },
    dbUpdateSort: async (sort) => {
        await db.updateAsync({ type: "sort" }, { $set: sort }, {});
    },
};

export default notesService;
