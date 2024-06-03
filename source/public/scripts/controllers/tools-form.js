const editNoteContainer = document.querySelector(".editNoteContainer");
const notesAppContainer = document.querySelector(".notesAppContainer");

const toolsForm = {
    cancelClose: () => {
        toolsForm.editNoteClose();
    },
    editNoteClose: () => {
        editNoteContainer.classList.add("hidden");
        notesAppContainer.classList.remove("hidden");
    },
    editNoteOpen: () => {
        editNoteContainer.classList.remove("hidden");
        notesAppContainer.classList.add("hidden");
    },
    newNote: () => {
        toolsForm.editNoteOpen();
    },
    outputRange: () => {
        const output = document.querySelector(".editNote__importanceOutput");
        const importance = document.querySelector(".editNote__importance");
        output.value = parseInt(importance.value, 10);
    },
};

export default toolsForm;
