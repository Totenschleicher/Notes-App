import toolsNotes from "./tools-notes.js";
import notesService from "../services/notes-service.js";
import exchangeNotes from "../services/exchange-notes.js";

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
        setTimeout(() => editNoteForm.reset(), 300);
    },
    createUpdateNote: async (event) => {
        event.preventDefault();
        if (title.value !== "") {
            let valueImportance = parseInt(importance.value, 10);
            if (valueImportance < 1) {
                valueImportance = 1;
            }
            if (valueImportance > 5) {
                valueImportance = 5;
            }
            const valuesNote = {
                description: description.value,
                dueDate: dueDate.value,
                finished: finished.checked,
                hidden: false,
                importance: valueImportance,
                title: title.value,
                type: "note",
            };
            const { editNoteId } = notesService;
            if (notesService.newNote === true) {
                await exchangeNotes.newNote(valuesNote);
            } else if (editNoteId !== "") {
                await exchangeNotes.editNote(editNoteId, valuesNote);
            }
            notesService.newNote = false;
            notesService.editNoteId = -1;
            await toolsNotes.renderNotes();
            toolsForm.editNoteClose();
            setTimeout(() => editNoteForm.reset(), 300);
        }
    },
    editNote: (event) => {
        const noteId = event.target.dataset.id;
        toolsForm.loadNote(noteId);
        toolsForm.editNoteOpen(false, noteId);
    },
    editNoteClose: () => {
        editNoteContainer.classList.add("hidden");
        notesAppContainer.classList.remove("hidden");
    },
    editNoteOpen: (newNote, noteId) => {
        notesService.newNote = newNote;
        notesService.editNoteId = noteId;
        editNoteContainer.classList.remove("hidden");
        notesAppContainer.classList.add("hidden");
        toolsForm.outputRange();
    },
    loadNote: (noteId) => {
        // eslint-disable-next-line no-underscore-dangle
        const note = notesService.notes.find((notes) => notes._id === noteId);
        description.value = note.description;
        dueDate.value = note.dueDate;
        finished.checked = note.finished;
        importance.value = note.importance;
        title.value = note.title;
    },
    newNote: () => {
        toolsForm.editNoteOpen(true, -1);
    },
    outputRange: () => {
        output.value = parseInt(importance.value, 10);
    },
};

export default toolsForm;
