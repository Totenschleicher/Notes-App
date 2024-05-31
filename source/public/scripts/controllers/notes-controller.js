import toolsForm from "./tools-form.js";

const newNoteForm = document.querySelector(".editNote__form");

newNoteForm.addEventListener("input", toolsForm.outputRange);
