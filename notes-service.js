import Datastore from "@seald-io/nedb";

const db = new Datastore({ filename: "./datafile", autoload: true });

const notesService = {
    dbLoadNotes: async () => db.findOneAsync({ _id: "1xRdfIYCCp0eDX6K" }),
    dbSaveNotes: async (notesData) => {
        try {
            await db.updateAsync({ _id: "1xRdfIYCCp0eDX6K" }, notesData, {
                upsert: true,
            });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    },
    dbLoadTheme: async () => db.findOneAsync({ _id: "w5oyT7JohG0gBf1I" }),
    dbSaveTheme: async (data) => {
        try {
            await db.updateAsync({ _id: "w5oyT7JohG0gBf1I" }, data, {
                upsert: true,
            });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    },
};

export default notesService;
