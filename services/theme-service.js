import { db } from "./datastore.js";

const themeService = {
    dbLoadTheme: async () => db.findOneAsync({ type: "theme" }),
    dbSaveTheme: async (theme) => {
        try {
            await db.insertAsync(theme);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    },
    dbUpdateTheme: async (data) => {
        await db.updateAsync({ type: "theme" }, { $set: data }, {});
    },
};

export default themeService;
