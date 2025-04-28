const config = require("../config");
const { cmd, commands } = require("../command");
const os = require("os");
const { runtime } = require("../lib/functions");
const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone");

cmd(
    {
        pattern: "menu2",
        react: "🛸",
        alias: ["panel", "commands"],
        desc: "Get bot's command list.",
        category: "main",
        use: ".menu",
        filename: __filename,
    },
    async (
        conn,
        mek,
        m,
        {
            from,
            l,
            quoted,
            body,
            isCmd,
            umarmd,
            args,
            q,
            isGroup,
            sender,
            senderNumber,
            botNumber2,
            botNumber,
            pushname,
            isMe,
            isOwner,
            groupMetadata,
            groupName,
            participants,
            groupAdmins,
            isBotAdmins,
            isAdmins,
            reply,
        },
    ) => {
        try {
            // Function to get a random image from assets
            const getRandomImage = () => {
                const assetsPath = path.join(__dirname, "../Unique_assets"); // Path to the assets folder
                const images = fs
                    .readdirSync(assetsPath)
                    .filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file)); // Filter image files
                if (images.length === 0) {
                    throw new Error("No images found in assets folder!");
                }
                const randomIndex = Math.floor(Math.random() * images.length);
                return path.join(assetsPath, images[randomIndex]); // Return full path of the random image
            };

            // Function to get a random voice file from assets
            const getRandomVoice = () => {
                const voicePath = path.join(__dirname, "../Unique_assets"); // Path to the assets folder
                const voices = fs
                    .readdirSync(voicePath)
                    .filter((file) => /\.(mp3)$/i.test(file)); // Filter audio files (MP3)
                if (voices.length === 0) {
                    throw new Error("No voice files found in assets folder!");
                }
                const randomIndex = Math.floor(Math.random() * voices.length);
                return path.join(voicePath, voices[randomIndex]); // Return full path of the random audio file
            };

            // Get a random image and voice file
            const randomImage = getRandomImage();
            const randomVoice = getRandomVoice();

            // Date and Time in international timezone (using moment-timezone)
            const currentTime = moment().tz("UTC").format("YYYY-MM-DD HH:mm:ss [UTC]");
            const localTime = moment().format("YYYY-MM-DD HH:mm:ss");

            // Ping and response time (mock data for demo purposes)
            const pingResponseTime = Math.floor(Math.random() * 100) + 20; // Simulated random ping between 20ms and 120ms
            const totalCommandsHit = Math.floor(Math.random() * 1000); // Mock total command hits (for demo)

            // Simplified menu layout with added bot info
            const madeMenu = `
*👾 Hello ${pushname}, Welcome to Unique MD!*

*⚡ Bot Info:*
- Bot Name: \`${config.BOT_NAME}\`
- Uptime: \`${runtime(process.uptime())}\`
- Mode: \`${config.MODE}\`
- Current Time (UTC): \`${currentTime}\`
- Local Time: \`${localTime}\`
- Ping: \`${pingResponseTime}ms\`
- Total Commands Hit: \`${totalCommandsHit}\`

*📡 General Commands:*
\`.gpt <text>\` - Chat with GPT
\`.weather <city>\` - Get weather updates
\`.quote\` - Get a random quote
\`.joke\` - Receive a joke

*🌐 Media Commands:*
\`.yt <url>\` - Download YouTube videos
\`.img <query>\` - Search for images
\`.song <query>\` - Search for songs

*🛠 Admin Commands:*
\`.add <number>\` - Add a user to the group
\`.kick <number>\` - Kick a user from the group
\`.mute\` - Mute the group chat

*⚙️ System Commands:*
\`.status\` - Check bot's status
\`.restart\` - Restart the bot
\`.shutdown\` - Shut down the bot

*🔗 Useful Links:*
- [GitHub Repo](https://github.com/your-bot-repo)
- [Support Group](https://chat.whatsapp.com/yourgroup)

*🚀 Enjoy using KINGVON-MD-V1!*
`;

            // Send the menu with the random image
            const imageBuffer = fs.readFileSync(randomImage); // Read the random image file
            await conn.sendMessage(
                from,
                { image: imageBuffer, caption: madeMenu },
                { quoted: mek },
            );

            // Send the random menu voice file
            const voiceBuffer = fs.readFileSync(randomVoice); // Read the random voice file
            await conn.sendMessage(
                from,
                { audio: voiceBuffer, mimetype: "audio/mpeg", ptt: true },
                { quoted: mek },
            );
        } catch (e) {
            console.error(e);
            reply(`Error: ${e.message}`);
        }
    },
);

