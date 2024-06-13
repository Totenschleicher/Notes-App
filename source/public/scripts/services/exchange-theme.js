import themeService from "./theme-service.js";

const exchangeTheme = {
    loadTheme: async () => {
        try {
            const response = await fetch("http://localhost:3000/theme");
            const data = await response.json();
            themeService.theme = data.theme;
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    },
    saveTheme: async (theme) => {
        try {
            const response = await fetch("http://localhost:3000/theme", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(theme),
            });
            const data = await response.json();
            if (data.theme !== theme.theme) {
                // eslint-disable-next-line no-console
                console.error(data);
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    },
};

export default exchangeTheme;
