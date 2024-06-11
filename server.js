import { app } from "./notes-controller.js";

const port = 3000;

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app listening at http://localhost:${port}`);
});

/*

import express from "express";

const app = express();
const port = 3000;

app.use(express.static("source/public"));

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app listening at http://localhost:${port}`);
});

*/
