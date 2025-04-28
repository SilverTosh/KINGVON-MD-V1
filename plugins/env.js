const fs = require('fs');
const path = require('path');
const { cmd } = require('../command');
const config = require('../config');

// Function to get a random image from the "assets" folder
function getRandomImage() {
    const assetsPath = path.join(__dirname, '../assets');
    const files = fs.readdirSync(assetsPath).filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
    if (files.length === 0) throw new Error("No images found in the assets folder.");
    const randomFile = files[Math.floor(Math.random() * files.length)];
    return path.join(assetsPath, randomFile);
}

cmd({
    pattern: "settings",
    react: "⚙️",
    alias: ["setting", "env"],
    desc: "Displays the current bot settings.",
    category: "main",
    use: ".settings",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const randomImagePath = getRandomImage();

        const madeSetting = `
╔════════════════════╗
    🌟 *BOT SETTINGS* 🌟
╚════════════════════╝

🔧 *Auto Read Status:* ${config.AUTO_READ_STATUS}
🔧 *Mode:* ${config.MODE}
🔧 *Auto Voice:* ${config.AUTO_VOICE}
🔧 *Auto Sticker:* ${config.AUTO_STICKER}
🔧 *Auto Reply:* ${config.AUTO_REPLY}
🔧 *Anti-Link:* ${config.ANTI_LINK}
🔧 *Anti-Bad Words:* ${config.ANTI_BAD}
🔧 *Prefix:* [${config.PREFIX}]
🔧 *Fake Recording:* ${config.FAKE_RECORDING}
🔧 *Auto React:* ${config.AUTO_REACT}
🔧 *Heart React:* ${config.HEART_REACT}
🔧 *Owner React:* ${config.OWNER_REACT}
🔧 *Bot Name:* ${config.BOT_NAME}

✨ _Powered by KINGVON-MD-V1_
╚═══════════════════════╝`;

        // Sending a random image along with the settings message
        await conn.sendMessage(
            from,
            {
                image: { url: `file://${randomImagePath}` },
                caption: madeSetting
            },
            { quoted: mek }
        );

    } catch (e) {
        console.error("Error fetching settings:", e);
        await reply("⚠️ *Unable to display settings. Please try again later.*");
    }
});

