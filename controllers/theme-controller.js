import themeService from "../services/theme-service.js";
import toolsCheck from "./tools-check.js";

const theme = {
    theme: 0,
    type: "theme",
};

const themeController = {
    showTheme: async (req, res) => {
        const data = await themeService.dbLoadTheme();
        if (data === null) {
            await themeService.dbSaveTheme(theme);
            const newData = await themeService.dbLoadTheme();
            res.send(newData);
        } else {
            res.send(data);
        }
    },
    updateTheme: async (req, res) => {
        const { body } = req;
        if (
            toolsCheck.emptyObject(body) ||
            toolsCheck.noObject(body) ||
            toolsCheck.noObjectProperty(body, "theme")
        ) {
            res.sendStatus(400);
        } else {
            const data = await themeService.dbLoadTheme();
            if (data === null) {
                await themeService.dbSaveTheme(theme);
            }
            await themeService.dbUpdateTheme(body);
            res.send(body);
        }
    },
};

export default themeController;
