const config = require("../config");
const { cmd, commands } = require("../command");
const os = require("os");
const { runtime } = require("../lib/functions");
const fs = require("fs");
const path = require("path");

cmd(
    {
        pattern: "menu",
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

            // Function to get the voice file
            const getMenuVoice = () => {
                const voicePath = path.join(
                    __dirname,
                    "../Unique_assets/menu.mp3",
                ); // Path to the voice file
                if (!fs.existsSync(voicePath)) {
                    throw new Error(
                        "Menu voice file not found in assets folder!",
                    );
                }
                return voicePath;
            };

            // Get a random image
            const randomImage = getRandomImage();
            const menuVoice = getMenuVoice();

            // Simplified menu layout
            const madeMenu = `
*👾 Hello ${pushname}, Welcome to Unique MD!*

*⚡ Available Commands:*

*💻 Bot Info:* 
- Bot Name: \`${config.BOT_NAME}\`
- Uptime: \`${runtime(process.uptime())}\`
- Mode: \`${config.MODE}\`

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
- [GitHub Repo](https://github.com/SilverTosh/KINGVON-MD-V1)
- [Support Group](https://whatsapp.com/channel/0029Vb5tbcZEKyZEHbicrV1y)

*🚀 Enjoy using KINGVON-MD-V1!*
`;

            // Send the menu with the random image
            const imageBuffer = fs.readFileSync(randomImage); // Read the random image file
            await conn.sendMessage(
                from,
                { image: imageBuffer, caption: madeMenu },
                { quoted: mek },
            );

            // Send the menu voice file
            const voiceBuffer = fs.readFileSync(menuVoice); // Read the voice file
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

