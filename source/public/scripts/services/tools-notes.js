import notesService from "./notes-service.js";

const notes = document.querySelector(".notes");

const toolsNotes = {
    addNote: (note) => {
        notesService.notes.push(note);
    },
    createId: () => {
        const { id } = notesService;
        notesService.id = id + 1;
        return id;
    },
    createTextDate: (date) => {
        if (date === "") {
            return "Irgendwann";
        }
        const dueDate = moment(date, "YYYY-MM-DD");
        const current = moment().startOf("day");
        const difference = moment.duration(dueDate.diff(current)).asDays();
        if (difference === 0) {
            return "Heute";
        }
        if (difference === 1) {
            return "In einem Tag";
        }
        if (difference > 1) {
            return `In ${difference} Tagen`;
        }
        if (difference === -1) {
            return "Vor einem Tag";
        }
        if (difference < -1) {
            return `Vor ${difference.toString().slice(1)} Tagen`;
        }
        return "Irgendwann";
    },
    renderNotes: () => {
        let notesCode = "";
        notesService.notes.forEach((note) => {
            const textStatus = note.finished === false ? "Offen" : "Erledigt";
            const checkboxChecked = note.finished === false ? "checked" : "";
            const styleDisabled =
                note.finished === false ? "importance" : "disabledImportance";
            const description =
                note.description === ""
                    ? ""
                    : `<p class="note__text">${note.description}</p>`;
            const textDate = toolsNotes.createTextDate(note.dueDate);
            notesCode += `
                <article class="note">
                    <div class="note__info">
                        <p class="note__date">${textDate}</p>
                        <label class="note__status">
                            <input type="checkbox" class="note__checkboxStatus" disabled ${checkboxChecked}>
                            ${textStatus}
                        </label>
                    </div>
                    <div class="note__message note--${styleDisabled}${note.importance}">
                        <div class="note__description">
                            <h2 class="note__title">${note.title}</h2>
                            ${description}
                        </div>
                        <div class="note__importance"></div>
                    </div>
                    <div>
                        <button type="button" class="note__btnEdit btn--small" data-id="${note.id}">
                            Bearbeiten
                        </button>
                    </div>
                </article>
            `;
            notes.innerHTML = notesCode;
        });
    },
};

export default toolsNotes;
