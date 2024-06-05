import tools from "./tools.js";
import toolsForm from "./tools-form.js";
import toolsTheme from "./tools-theme.js";

const btnCancelClose = document.querySelector(".editNote__btnCancelClose");
const btnNewNote = document.querySelector(".header__btnNewNote");
const btnTheme = document.querySelectorAll(".header__btnTheme");
const editNoteForm = document.querySelector(".editNote__form");
const notes = document.querySelector(".notes");

btnCancelClose.addEventListener("click", toolsForm.cancelClose);
btnNewNote.addEventListener("click", toolsForm.newNote);
btnTheme.forEach((node) =>
    node.addEventListener("click", toolsTheme.changeTheme),
);
editNoteForm.addEventListener("input", toolsForm.outputRange);
editNoteForm.addEventListener("submit", toolsForm.createUpdateNote);
notes.addEventListener(
    "click",
    tools.delegate(".note__btnEdit", toolsForm.editNote),
);
