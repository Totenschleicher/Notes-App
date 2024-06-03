import toolsForm from "./tools-form.js";
import toolsTheme from "./tools-theme.js";

const editNoteForm = document.querySelector(".editNote__form");
const btnTheme = document.querySelectorAll(".header__btnTheme");

editNoteForm.addEventListener("input", toolsForm.outputRange);
btnTheme.forEach((node) =>
    node.addEventListener("click", toolsTheme.changeTheme),
);
