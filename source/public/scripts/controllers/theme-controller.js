import toolsTheme from "./tools-theme.js";

const btnTheme = document.querySelectorAll(".header__btnTheme");

btnTheme.forEach((node) =>
    node.addEventListener("click", toolsTheme.changeTheme),
);

toolsTheme.renderTheme();
