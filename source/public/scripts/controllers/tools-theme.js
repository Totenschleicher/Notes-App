const toolsTheme = {
    changeTheme: () => {
        const theme = document.querySelector(".theme");
        theme.classList.toggle("theme--light");
        theme.classList.toggle("theme--dark");
    },
};

export default toolsTheme;
