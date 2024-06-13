import notesService from "../services/notes-service.js";

const notes = document.querySelector(".notes");

const toolsNotes = {
    createId: () => {
        const { noteCounterId } = notesService;
        notesService.noteCounterId = noteCounterId + 1;
        return noteCounterId;
    },
    createTextDate: (date) => {
        if (date === "") {
            return "Irgendwann";
        }
        // eslint-disable-next-line no-undef
        const dueDate = moment(date, "YYYY-MM-DD");
        // eslint-disable-next-line no-undef
        const current = moment().startOf("day");
        // eslint-disable-next-line no-undef
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
            const checkboxChecked = note.finished === false ? "" : "checked";
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
