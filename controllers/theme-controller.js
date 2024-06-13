import themeService from "../services/theme-service.js";
import toolsCheck from "./tools-check.js";

const themeController = {
    showTheme: async (req, res) => {
        res.send(await themeService.dbLoadTheme());
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
            await themeService.dbSaveTheme(body);
            res.send(body);
        }
    },
};

export default themeController;
