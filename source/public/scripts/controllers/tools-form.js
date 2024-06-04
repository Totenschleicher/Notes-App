import toolsNotes from "../services/tools-notes.js";

const description = document.querySelector(".editNoteDescription");
const dueDate = document.querySelector(".editNoteDueDate");
const editNoteContainer = document.querySelector(".editNoteContainer");
const editNoteForm = document.querySelector(".editNote__form");
const finished = document.querySelector(".editNoteFinished");
const importance = document.querySelector(".editNote__importance");
const notesAppContainer = document.querySelector(".notesAppContainer");
const output = document.querySelector(".editNote__importanceOutput");
const title = document.querySelector(".editNote__title");

const toolsForm = {
    cancelClose: () => {
        toolsForm.editNoteClose();
    },
    createNewNote: (event) => {
        event.preventDefault();
        if (title.value !== "") {
            let valueImportance = parseInt(importance.value, 10);
            if (valueImportance < 1) {
                valueImportance = 1;
            } else if (valueImportance > 5) {
                valueImportance = 5;
            }
            const valuesNewNote = {
                description: description.value,
                dueDate: dueDate.value,
                finished: finished.checked,
                id: toolsNotes.createId(),
                importance: valueImportance,
                title: title.value,
            };
            toolsNotes.addNote(valuesNewNote);
            toolsNotes.renderNotes();
            editNoteForm.reset();
            toolsForm.editNoteClose();
        }
    },
    editNoteClose: () => {
        editNoteContainer.classList.add("hidden");
        notesAppContainer.classList.remove("hidden");
    },
    editNoteOpen: () => {
        editNoteContainer.classList.remove("hidden");
        notesAppContainer.classList.add("hidden");
        toolsForm.outputRange();
    },
    newNote: () => {
        toolsForm.editNoteOpen();
    },
    outputRange: () => {
        output.value = parseInt(importance.value, 10);
    },
};

export default toolsForm;
