import tools from "./tools.js";
import toolsForm from "./tools-form.js";
import toolsNotes from "./tools-notes.js";
import exchangeNotes from "../services/exchange-notes.js";

const btnCancelClose = document.querySelector(".editNote__btnCancelClose");
const btnNewNote = document.querySelector(".header__btnNewNote");
const editNoteForm = document.querySelector(".editNote__form");
const headerControl = document.querySelector(".header__control");
const notes = document.querySelector(".notes");

btnCancelClose.addEventListener("click", toolsForm.cancelClose);
btnNewNote.addEventListener("click", toolsForm.newNote);
editNoteForm.addEventListener("input", toolsForm.outputRange);
editNoteForm.addEventListener("submit", toolsForm.createUpdateNote);
headerControl.addEventListener(
    "click",
    tools.delegate(".header__btnName", () => {
        toolsNotes.sort("title");
    }),
);
headerControl.addEventListener(
    "click",
    tools.delegate(".header__btnDueDate", () => {
        toolsNotes.sort("dueDate");
    }),
);
headerControl.addEventListener(
    "click",
    tools.delegate(".header__btnCreationDate", () => {
        toolsNotes.sort("creationDate");
    }),
);
headerControl.addEventListener(
    "click",
    tools.delegate(".header__btnImportance", () => {
        toolsNotes.sort("importance");
    }),
);
headerControl.addEventListener(
    "click",
    tools.delegate(".header__btnOpen", () => {
        toolsNotes.filterNotes("open");
    }),
);
headerControl.addEventListener(
    "click",
    tools.delegate(".header__btnCompleted", () => {
        toolsNotes.filterNotes("completed");
    }),
);
headerControl.addEventListener("mousedown", (event) => {
    event.preventDefault();
});
notes.addEventListener(
    "click",
    tools.delegate(".note__btnEdit", toolsForm.editNote),
);

exchangeNotes
    .loadSort()
    .then(() => exchangeNotes.loadFilter())
    .then(() => toolsNotes.renderNotes());
