import notesService from "./notes-service.js";

const exchangeNotes = {
    checkFields: (data, note) => {
        if (
            data.description !== note.description ||
            data.dueDate !== note.dueDate ||
            data.finished !== note.finished ||
            data.hidden !== note.hidden ||
            data.importance !== note.importance ||
            data.title !== note.title ||
            data.type !== note.type
        ) {
            // eslint-disable-next-line no-console
            console.error(data);
        }
    },
    editNote: async (noteId, note) => {
        try {
            const response = await fetch(
                `http://localhost:3000/notes/${noteId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(note),
                },
            );
            const data = await response.json();
            exchangeNotes.checkFields(data, note);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    },
    loadNotes: async (sort, finished = "none") => {
        try {
            const response = await fetch(
                `http://localhost:3000/notes?sort=${sort.sort}&order=${sort.order}&filter=${finished}`,
            );
            const data = await response.json();
            notesService.notes = data;
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    },
    loadSort: async () => {
        try {
            const response = await fetch("http://localhost:3000/sort");
            const data = await response.json();
            notesService.sortNotes.sort = data.sort;
            notesService.sortNotes.order = data.order;
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    },
    newNote: async (note) => {
        try {
            const response = await fetch("http://localhost:3000/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(note),
            });
            const data = await response.json();
            exchangeNotes.checkFields(data, note);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    },
    saveSort: async (sort) => {
        try {
            const response = await fetch("http://localhost:3000/sort", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(sort),
            });
            const data = await response.json();
            if (data.sort !== sort.sort || data.order !== sort.order) {
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
