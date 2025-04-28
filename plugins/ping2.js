const config = require("../config");
const fs = require("fs");
const path = require("path");
const { cmd } = require("../command");

cmd(
    {
        pattern: "pingg",
        react: "♻️",
        alias: ["speedd"],
        desc: "Check bot's ping and send a voice message with a chat link",
        category: "main",
        use: ".ping",
        filename: __filename,
    },
    async (conn, mek, m, { from, quoted, reply }) => {
        try {
            // Measure ping time
            const startTime = Date.now();
            await conn.sendMessage(from, { text: "*_🪄 Pinging..._*" });
            const endTime = Date.now();
            const ping = endTime - startTime;

            // Send ping response
            await conn.sendMessage(
                from,
                { text: `*♻️ Speed: ${ping}ms*` },
                { quoted: mek },
            );

            // Select random voice file from assets
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

                // WhatsApp direct chat link to your number
                const phoneNumber = "254720326316"; // Replace with your number
                const chatLink = `https://wa.me/${phoneNumber.replace("+", "")}?text=Hi%20von!%20I%20found%20your%20bot%20interesting.%20`;

                // Send voice message with chat link
                await conn.sendMessage(
                    from,
                    {
                        audio: { url: voicePath },
                        mimetype: "audio/mpeg",
                        ptt: true,
                        caption: `🔥 *Message KINGVON Directly* 🔥\n\n📩 [Click Here]( ${chatLink} ) to start chatting with me on WhatsApp!`,
                    },
                    { quoted: mek },
                );
            } else {
                await conn.sendMessage(
                    from,
                    { text: "*No voice messages found in the assets folder!*" },
                    { quoted: mek },
                );
            }
        } catch (e) {
            console.log(e);
            reply("*Error while sending voice message and chat link!*");
        }
    },
);

