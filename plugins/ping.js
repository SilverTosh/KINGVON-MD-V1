const config = require("../config");
const fs = require("fs");
const path = require("path");
const { cmd } = require("../command");

cmd(
    {
        pattern: "ping",
        react: "♻️",
        alias: ["speed"],
        desc: "Check bot's ping and send a voice message with vCard",
        category: "main",
        use: ".ping",
        filename: __filename,
    },
    async (conn, mek, m, { from, quoted, reply }) => {
        try {
            // Start ping measurement
            const startTime = Date.now();
            await conn.sendMessage(from, { text: "> pinning from express server" });
            const endTime = Date.now();
            const ping = endTime - startTime;

            // Ping response
            await conn.sendMessage(
                from,
                { text: ` *Express server speed* : ${ping}ms*` },
                { quoted: mek },
            );

            // Random voice file selection
            const assetsPath = path.resolve(__dirname, "../Unique_assets");
            const files = fs
                .readdirSync(assetsPath)
                .filter(
                    (file) => file.endsWith(".mp3") || file.endsWith(".ogg"),
                );

            if (files.length > 0) {
                const randomFile =
                    files[Math.floor(Math.random() * files.length)];
                const voicePath = path.join(assetsPath, randomFile);

                // vCard information embedded as a follow-up to the voice note
                const vcard = `BEGIN:VCARD
VERSION:3.0
FN:KINGVON (Developer)
TEL;TYPE=CELL:+254720326316
EMAIL: kingvon64thO@gmail.com
ORG:Bot Development Team
NOTE: Contact Wasi for Bot Support
END:VCARD`;

                // Send voice message and vCard together
                await conn.sendMessage(
                    from,
                    {
                        audio: { url: voicePath },
                        mimetype: "audio/mpeg",
                        ptt: true,
                        caption: "Contact Wasi for more info.", // Optional caption
                    },
                    { quoted: mek },
                );

                // Send vCard right after the voice
                await conn.sendMessage(
                    from,
                    {
                        contacts: {
                            displayName: "Von",
                            contacts: [{ vcard }],
                        },
                    },
                    { quoted: mek },
                );
            } else {
                await conn.sendMessage(
                    from,
                    { text: "*No voice messages found in assets folder!*" },
                    { quoted: mek },
                );
            }
        } catch (e) {
            console.log(e);
            reply("*Error while sending the voice note and vCard!*");
        }
    },
);

