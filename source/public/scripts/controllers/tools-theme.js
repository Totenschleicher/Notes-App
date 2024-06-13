import themeService from "../services/theme-service.js";
import exchangeTheme from "../services/exchange-theme.js";

const theme = document.querySelector(".theme");

const toolsTheme = {
    changeTheme: async () => {
        if (themeService.theme === 0) {
            await exchangeTheme.saveTheme({ theme: 1 });
        } else {
            await exchangeTheme.saveTheme({ theme: 0 });
        }
        toolsTheme.renderTheme();
    },
    renderTheme: async () => {
        await exchangeTheme.loadTheme();
        if (themeService.theme === 0) {
            theme.classList.remove("theme--dark");
            theme.classList.add("theme--light");
        } else {
            theme.classList.remove("theme--light");
            theme.classList.add("theme--dark");
        }
    },
};

export default toolsTheme;
