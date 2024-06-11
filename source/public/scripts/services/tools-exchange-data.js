import notesService from "./notes-service.js";
import toolsNotes from "./tools-notes.js";

const toolsExchangeData = {
    loadNotes: async () => {
        try {
            const response = await fetch("http://localhost:3000/notes");
            const data = await response.json();
            notesService.notes = data.notes;
            notesService.noteCounterId = data.noteCounterId;
            notesService.newNote = data.newNote;
            notesService.editNoteId = data.editNoteId;
            notesService.theme = data.theme;
            toolsNotes.renderNotes();
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    },
    saveNotes: async () => {
        try {
            const response = await fetch("http://localhost:3000/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(notesService),
            });
            const data = await response.json();
            if (
                JSON.stringify(data.notes) !==
                    JSON.stringify(notesService.notes) ||
                data.noteCounterId !== notesService.noteCounterId ||
                data.newNote !== notesService.newNote ||
                data.editNoteId !== notesService.editNoteId ||
                data.theme !== notesService.theme
            ) {
                // eslint-disable-next-line no-console
                console.error(data);
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    },
};

export default toolsExchangeData;
