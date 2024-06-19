/* eslint-disable no-underscore-dangle */
import notesService from "../services/notes-service.js";
import exchangeNotes from "../services/exchange-notes.js";

const notes = document.querySelector(".notes");
const nameIcon = document.querySelector(".header__btnNameIcon");
const dueDateIcon = document.querySelector(".header__btnDueDateIcon");
const creationDateIcon = document.querySelector(".header__btnCreationDateIcon");
const importanceIcon = document.querySelector(".header__btnImportanceIcon");

const toolsNotes = {
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
    renderNotes: async () => {
        await exchangeNotes.loadNotes(notesService.sortNotes);
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
                        <button type="button" class="note__btnEdit btn--small" data-id="${note._id}">
                            Bearbeiten
                        </button>
                    </div>
                </article>
            `;
            notes.innerHTML = notesCode;
        });
        toolsNotes.showSort();
    },
    sort: async (field) => {
        if (notesService.sortNotes.sort === field) {
            toolsNotes.sortChangeOrder();
        } else {
            notesService.sortNotes.sort = field;
            notesService.sortNotes.order = "ascending";
        }
        await exchangeNotes.saveSort(notesService.sortNotes);
        await toolsNotes.renderNotes();
    },
    sortChangeOrder: () => {
        if (notesService.sortNotes.order === "descending") {
            notesService.sortNotes.order = "ascending";
        } else {
            notesService.sortNotes.order = "descending";
        }
    },
    hideSort: (node) => {
        node.classList.remove("header__sortIcon", "header__sortIconDown");
    },
    showSort: () => {
        toolsNotes.hideSort(nameIcon);
        toolsNotes.hideSort(dueDateIcon);
        toolsNotes.hideSort(importanceIcon);
        toolsNotes.hideSort(creationDateIcon);
        const { sort } = notesService.sortNotes;
        let sortButton = "";
        let iconDown = false;
        switch (sort) {
            case "title":
                sortButton = nameIcon;
                break;
            case "dueDate":
                sortButton = dueDateIcon;
                break;
            case "importance":
                sortButton = importanceIcon;
                break;
            default:
                sortButton = creationDateIcon;
        }
        if (notesService.sortNotes.order === "ascending") {
            iconDown = true;
        }
        if (iconDown === true) {
            sortButton.classList.add(
                "header__sortIcon",
                "header__sortIconDown",
            );
        } else {
            sortButton.classList.add("header__sortIcon");
        }
    },
};

export default toolsNotes;
