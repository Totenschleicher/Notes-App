import toolsTheme from "./tools-theme.js";

const btnTheme = document.querySelectorAll(".header__btnTheme");

btnTheme.forEach((node) =>
    node.addEventListener("click", toolsTheme.changeTheme),
);
btnTheme.forEach((node) =>
    node.addEventListener("mousedown", (event) => {
        event.preventDefault();
    }),
);

toolsTheme.renderTheme();
