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
const axios = require("axios");
const semver = require("semver");
const logger = require("./utils/log");

function startBot(message) {
    if (message) logger(message, "[ Starting ]");

    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "umaru.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("close", (codeExit) => {
        if (codeExit !== 0 || (global.countRestart && global.countRestart < 5)) {
            startBot("Starting up...");
            global.countRestart = (global.countRestart || 0) + 1;
            return;
        }
    });

    child.on("error", (error) => {
        logger("An error occurred: " + JSON.stringify(error), "[ Starting ]");
    });
}

axios.get("https://raw.githubusercontent.com/umaruchan0x1861/umarubot1.1.1/main/package.json").then((res) => {
    logger(res.data.name, "[ NAME ]");
    logger("Version: " + res.data.version, "[ VERSION ]");
    logger(res.data.description, "[ DESCRIPTION ]");
}).catch((error) => {
    logger("Failed to fetch package.json from GitHub: " + error.message, "[ ERROR ]");
});

startBot();
