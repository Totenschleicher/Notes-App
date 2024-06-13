import tools from "./tools.js";
import toolsForm from "./tools-form.js";
import toolsNotes from "./tools-notes.js";

const btnCancelClose = document.querySelector(".editNote__btnCancelClose");
const btnNewNote = document.querySelector(".header__btnNewNote");
const editNoteForm = document.querySelector(".editNote__form");
const notes = document.querySelector(".notes");

btnCancelClose.addEventListener("click", toolsForm.cancelClose);
btnNewNote.addEventListener("click", toolsForm.newNote);
editNoteForm.addEventListener("input", toolsForm.outputRange);
editNoteForm.addEventListener("submit", toolsForm.createUpdateNote);
notes.addEventListener(
    "click",
    tools.delegate(".note__btnEdit", toolsForm.editNote),
);

toolsNotes.renderNotes();
