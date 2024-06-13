const toolsCheck = {
    emptyObject: (body) => JSON.stringify(body) === "{}",
    noObject: (body) => JSON.stringify(body).slice(0, 1) !== "{",
    noObjectProperty: (body, value) => !(value in body),
};

export default toolsCheck;
