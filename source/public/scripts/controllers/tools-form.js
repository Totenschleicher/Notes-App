const toolsForm = {
    outputRange: () => {
        const output = document.querySelector(".editNote__importanceOutput");
        const importance = document.querySelector(".editNote__importance");
        output.value = parseInt(importance.value, 10);
    },
};

export default toolsForm;
