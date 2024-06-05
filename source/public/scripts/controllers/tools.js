const tools = {
    delegate: (cssClass, callbackFunction) => {
        return (event) => {
            if (event.target.matches(cssClass)) {
                callbackFunction(event);
            }
        };
    },
};

export default tools;
