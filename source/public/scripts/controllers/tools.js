const tools = {
    delegate: (cssClass, callbackFunction) => (event) => {
        if (event.target.matches(cssClass)) {
            callbackFunction(event);
        }
    },
};

export default tools;
