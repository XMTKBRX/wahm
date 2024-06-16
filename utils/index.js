const express = require('express');
const app = express();
const port = process.env.PORT || 3000;  // استخدام المنفذ المقدم من Heroku أو الافتراضي 3000

app.get('/', (req, res) => {
    res.send('مرحبًا بالعالم!');
});

app.listen(port, () => {
    console.log(`الخادم يعمل على المنفذ ${port}`);
});

const { spawn } = require("child_process");
const { readFileSync } = require("fs-extra");
const http = require("http");
const axios = require("axios");
const semver = require("semver");
const logger = require("./utils/log");

function startBot(message) {
    (message) ? logger(message, "[ Starting ]") : "";

    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "umaru.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("close", (codeExit) => {
        if (codeExit != 0 || global.countRestart && global.countRestart < 5) {
            startBot("Starting up...");
            global.countRestart += 1;
            return;
        } else return;
    });

    child.on("error", function(error) {
        logger("An error occurred: " + JSON.stringify(error), "[ Starting ]");
    });
}

axios.get("https://raw.githubusercontent.com/umaruchan0x1861/umarubot1.1.1/main/package.json").then((res) => {
    logger(res['data']['name'], "[ NAME ]");
    logger("Version: " + res['data']['version'], "[ VERSION ]");
    logger(res['data']['description'], "[ DESCRIPTION ]");
});
startBot();
