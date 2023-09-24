require("dotenv").config();
require("./bot");

const express = require("express");
const { Telegraf, Telegram } = require("telegraf");
const request = require("request");
const https = require("https");

const app = express();
const port = process.env.PORT;

const tg = new Telegram(process.env.BOT_TOKEN);

app.get("/", async (req, res) => {
    const file_id = req.query.file_id;

    if (!file_id) {
        return res.send("No file_id found!");
    }

    console.log(file_id);

    try {
        const file_url = await tg.getFileLink(file_id);
        const video_url = file_url.href;

        const video = request(file_url.href);
        video.pipefilter = function (response, dest) {
            // remove headers
            // for (const h in response.headers) {
            //     dest.removeHeader(h);
            // }
            // or modify
            dest.setHeader(
                "Content-Disposition",
                "attachment; filename=" + "download.mp4"
            );
        };
        video.pipe(res);
    } catch (e) {
        console.log(e);
        res.end(`Error: ${e.message}`);
    }
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
