import notesService from "./notes-service.js";
import toolsNotes from "../controllers/tools-notes.js";

const exchangeNotes = {
    loadNotes: async () => {
        try {
            const response = await fetch("http://localhost:3000/notes");
            const data = await response.json();
            notesService.notes = data.notes;
            notesService.noteCounterId = data.noteCounterId;
            toolsNotes.renderNotes();
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    },
    saveNotes: async () => {
        const notes = {};
        notes.notes = notesService.notes;
        notes.noteCounterId = notesService.noteCounterId;
        try {
            const response = await fetch("http://localhost:3000/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(notes),
            });
            const data = await response.json();
            if (
                JSON.stringify(data.notes) !==
                    JSON.stringify(notesService.notes) ||
                data.noteCounterId !== notesService.noteCounterId
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

export default exchangeNotes;
