import { db } from "./datastore.js";

const themeService = {
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

export default themeService;
