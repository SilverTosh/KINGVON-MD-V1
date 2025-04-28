const { cmd } = require('../command');
const { exec } = require('child_process');
const config = require('../config');

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
    pattern: "zinda",
    react: "🌐",
    desc: "Check bot status and get additional info.",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
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

*Powered by KINGVON-MD-V1 Bot!*

`;

        // Send bot status message
        await conn.sendMessage(from, { text: message }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});

