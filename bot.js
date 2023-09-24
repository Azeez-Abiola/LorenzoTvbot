const { Telegraf, Telegram } = require("telegraf");

const upload = require("./cloud");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply("Forward a video file to me!!!"));

bot.on("video", async (ctx) => {
    const video = ctx.update.message.video;
    const { file_id } = video;

    ctx.reply(`${process.env.URL}/?file_id=${file_id}`);

    console.log(ctx.chat);

    try {
        if (process.env.ADMIN_ID == ctx.chat.id) {
            ctx.reply("Uploading to cloudinary");
            const file_url = await ctx.telegram.getFileLink(file_id);
            const file = await upload(file_url.href);
            ctx.reply(`CLOUDINARY: \n${file.secure_url}`);
        }
    } catch (e) {
        console.log(e);
        ctx.reply("Error uploading to cloudinary");
    }
});

bot.launch();
console.log("Bot started...");

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
