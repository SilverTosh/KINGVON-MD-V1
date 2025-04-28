const { cmd } = require('../command');
const fs = require('fs');
const path = require('path');
const { randomInt } = require('crypto');
const config = require('../config');

// Path for assets
const assetFolder = './Unique_assets/';

// Function to get files by extension from the directory
const getFilesByExtension = (dir, ext) => {
    return fs.readdirSync(dir).filter(file => file.endsWith(ext));
};

// Function to get bot's ping
const getBotPing = () => {
    return new Promise((resolve, reject) => {
        const start = Date.now();
        exec('ping -c 1 google.com', (error, stdout, stderr) => {
            if (error || stderr) {
                reject('Ping error');
            } else {
                const end = Date.now();
                resolve(end - start);
            }
        });
    });
};

// Function to calculate bot runtime
const getBotRuntime = () => {
    const uptime = process.uptime(); // Bot uptime in seconds
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
};

cmd({
    pattern: "alive",
    react: "🌐",
    desc: "Check bot status and get additional info.",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Get files by extension from the assets folder
        const imageFiles = getFilesByExtension(assetFolder, '.jpeg').concat(getFilesByExtension(assetFolder, '.png'));
        const voiceFiles = getFilesByExtension(assetFolder, '.mp3');

        // Ensure there are images and voice files available
        if (imageFiles.length === 0 || voiceFiles.length === 0) {
            return reply("❌ No images or voice files found in the assets folder.");
        }

        // Get random image and voice file
        const randomImage = imageFiles[randomInt(0, imageFiles.length)];
        const randomVoice = voiceFiles[randomInt(0, voiceFiles.length)];

        // Get bot's ping
        const botPing = await getBotPing();

        // Get bot runtime
        const botRuntime = getBotRuntime();

        // Prepare the message with all the information
        const message = `
Hello, *${pushname}*!

🌐 *Bot is Online!* 
Ping: *${botPing}ms*
Runtime: *${botRuntime}*

Here is a random voice and image for you:

🎵 *Voice:*
Click the voice message below to listen to a random sound! 🎶

📸 *Image:*
Enjoy this random image!

*Powered by KINGVON!*

`;

        // Send random voice message
        await conn.sendMessage(from, { 
            audio: { url: path.join(assetFolder, randomVoice) }, 
            mimetype: 'audio/mp4', 
            caption: '🎵 Random Voice Message 🎶'
        }, { quoted: mek });

        // Send random image
        await conn.sendMessage(from, { 
            image: { url: path.join(assetFolder, randomImage) },
            caption: '📸 Random Image'
        }, { quoted: mek });

        // Send bot status message
        await conn.sendMessage(from, { text: message }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});
