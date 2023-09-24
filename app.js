require("dotenv").config();
require("./bot");

const express = require("express");
const { Telegraf, Telegram } = require("telegraf");
const request = require("request");

const app = express();
const port = process.env.PORT;

const tg = new Telegram(process.env.BOT_TOKEN);

app.get("/", async (req, res) => {
    const file_id = req.query.file_id;

    console.log(file_id);

    try {
        const file_url = await tg.getFileLink(file_id);
        const video_url = file_url.href;

        const video = request(file_url.href);
        video.pipe(res);
    } catch (e) {
        console.log(e);
        res.end(`Error: ${e.message}`);
    }
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
