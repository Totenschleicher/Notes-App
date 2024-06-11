import Datastore from "@seald-io/nedb";

const db = new Datastore({ filename: "./datafile", autoload: true });

const notesService = {
    loadDatabase: async () => db.findOneAsync({ _id: "1xRdfIYCCp0eDX6K" }),
    saveDatabase: async (notesData) => {
        try {
            await db.updateAsync({ _id: "1xRdfIYCCp0eDX6K" }, notesData, {
                upsert: true,
            });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    },
};

export default notesService;
