import { db } from "./datastore.js";

const notesService = {
    dbLoadNotes: async () => db.findAsync({ type: "note" }),
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
};

export default notesService;
