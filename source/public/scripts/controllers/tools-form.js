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
    createUpdateNote: (event) => {
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
                importance: valueImportance,
                title: title.value,
            };
            const { editNoteId } = notesService;
            if (notesService.newNote === true) {
                valuesNote.id = toolsNotes.createId();
                notesService.notes.push(valuesNote);
            } else if (editNoteId >= 0) {
                valuesNote.id = editNoteId;
                const findIndex = notesService.notes.findIndex(
                    (value) => value.id === editNoteId,
                );
                notesService.notes.splice(findIndex, 1, valuesNote);
            }
            notesService.newNote = false;
            notesService.editNoteId = -1;
            toolsNotes.renderNotes();
            toolsForm.editNoteClose();
            setTimeout(() => editNoteForm.reset(), 300);
            exchangeNotes.saveNotes();
        }
    },
    editNote: (event) => {
        const noteId = parseInt(event.target.dataset.id, 10);
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
        const [note] = notesService.notes.slice(noteId);
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
