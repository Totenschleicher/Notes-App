/* eslint-disable no-underscore-dangle */
import notesService from "../services/notes-service.js";
import exchangeNotes from "../services/exchange-notes.js";

const body = document.querySelector(".body");
const btnCompleted = document.querySelector(".header__btnCompleted");
const btnCompletedIcon = document.querySelector(".header__btnCompletedIcon");
const btnOpen = document.querySelector(".header__btnOpen");
const btnOpenIcon = document.querySelector(".header__btnOpenIcon");
const creationDateIcon = document.querySelector(".header__btnCreationDateIcon");
const dialog = document.querySelector(".notesAppDialog");
const dueDateIcon = document.querySelector(".header__btnDueDateIcon");
const importanceIcon = document.querySelector(".header__btnImportanceIcon");
const nameIcon = document.querySelector(".header__btnNameIcon");
const notes = document.querySelector(".notes");
const notesContainer = document.querySelector(".notesContainer");

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
    filterNotes: async (finished) => {
        if (notesService.filterNotes.filter === finished) {
            notesService.filterNotes.filter = "none";
        } else {
            notesService.filterNotes.filter = finished;
        }
        await exchangeNotes.saveFilter(notesService.filterNotes);
        await toolsNotes.renderNotes(true);
    },
    filterShow: () => {
        btnCompleted.classList.remove("btn--active");
        btnCompletedIcon.classList.remove("header__filterIcon");
        btnOpen.classList.remove("btn--active");
        btnOpenIcon.classList.remove("header__filterIcon");
        const { filter } = notesService.filterNotes;
        if (filter === "open") {
            btnOpen.classList.add("btn--active");
            btnOpenIcon.classList.add("header__filterIcon");
        }
        if (filter === "completed") {
            btnCompleted.classList.add("btn--active");
            btnCompletedIcon.classList.add("header__filterIcon");
        }
    },
    deleteNoteMessage: (event) => {
        const noteTitle = event.target.dataset.title;
        const noteId = event.target.dataset.id;
        dialog.innerHTML = `
            <p><strong class="notesAppDialog__title">«${noteTitle}»</strong>wirklich löschen?</p>
            <button type="button" class="notesAppDialog__btnCancel btn--small">Abbrechen</button>
            &nbsp;
            <button type="button" class="notesAppDialog__btnDelete btn--small" data-id="${noteId}">Löschen</button>
        `;
        dialog.showModal();
        document.querySelector(".notesAppDialog__btnCancel").blur();
        document.querySelector(".notesAppDialog__btnDelete").blur();
        body.classList.add("bodyBlur");
    },
    deleteNoteMessageCancel: () => {
        dialog.close();
        body.classList.remove("bodyBlur");
    },
    deleteNoteMessageDelete: async (event) => {
        await toolsNotes.deleteNote(event);
        toolsNotes.deleteNoteMessageCancel();
    },
    deleteNoteMessageEsc: (event) => {
        if (event.key === "Escape") {
            toolsNotes.deleteNoteMessageCancel();
        }
    },
    deleteNote: async (event) => {
        const noteId = event.target.dataset.id;
        await exchangeNotes.deleteNote(noteId);
        await toolsNotes.renderNotes(true);
    },
    renderNotesHeight: () =>
        document.querySelector(".notes").getBoundingClientRect().height,
    renderNotes: async (animation) => {
        await exchangeNotes.loadNotes(
            notesService.sortNotes,
            notesService.filterNotes,
        );
        let time = 0;
        if (animation) {
            time = 300;
            notesContainer.style.height = `${toolsNotes.renderNotesHeight()}px`;
            notesContainer.classList.add("hidden");
        }
        toolsNotes.filterShow();
        toolsNotes.sortShow();
        setTimeout(() => {
            if (notesService.notes.length === 0) {
                notes.innerHTML = `<p class="noNote">Keine Notizen gefunden!</p>`;
            } else {
                let notesCode = "";
                notesService.notes.forEach((note) => {
                    const textStatus =
                        note.finished === false ? "Offen" : "Erledigt";
                    const checkboxChecked =
                        note.finished === false ? "" : "checked";
                    const styleDisabled =
                        note.finished === false
                            ? "importance"
                            : "disabledImportance";
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
                                <div class="note__importance">&nbsp;</div>
                            </div>
                            <div class="note__control">
                                <button type="button" class="note__btnEdit btn--small" data-id="${note._id}" title="Bearbeiten">&nbsp;</button>
                                <button type="button" class="note__btnDelete btn--small" data-id="${note._id}" data-title="${note.title}" title="Löschen">&nbsp;</button>
                            </div>
                        </article>
                    `;
                    notes.innerHTML = notesCode;
                });
            }
            if (animation) {
                notesContainer.style.height = `${toolsNotes.renderNotesHeight()}px`;
            }
        }, time);
        if (animation) {
            setTimeout(() => {
                notesContainer.classList.remove("hidden");
                notesContainer.style.removeProperty("height");
            }, 600);
        }
    },
    sort: async (field) => {
        if (notesService.sortNotes.sort === field) {
            toolsNotes.sortChangeOrder();
        } else {
            notesService.sortNotes.sort = field;
            notesService.sortNotes.order = "ascending";
        }
        await exchangeNotes.saveSort(notesService.sortNotes);
        await toolsNotes.renderNotes(true);
    },
    sortChangeOrder: () => {
        if (notesService.sortNotes.order === "descending") {
            notesService.sortNotes.order = "ascending";
        } else {
            notesService.sortNotes.order = "descending";
        }
    },
    sortHide: (node) => {
        node.classList.remove("header__sortIcon", "header__sortIconDown");
    },
    sortShow: () => {
        toolsNotes.sortHide(nameIcon);
        toolsNotes.sortHide(dueDateIcon);
        toolsNotes.sortHide(importanceIcon);
        toolsNotes.sortHide(creationDateIcon);
        const { sort } = notesService.sortNotes;
        let sortButton;
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
