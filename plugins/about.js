const fs = require('fs');
const path = require('path');
const config = require('../config');
const { cmd, commands } = require('../command');

// Function to get a random image from the 'assets' folder
function getRandomImage() {
    const assetsFolder = path.join(__dirname, '../Unique_assets'); // Path to the assets folder
    const files = fs.readdirSync(assetsFolder);  // Read all files in the assets folder
    const imageFiles = files.filter(file => file.match(/\.(jpg|jpeg|png|gif)$/i)); // Filter image files (jpg, jpeg, png, gif)
    
    // If there are no images in the folder, return a default image
    if (imageFiles.length === 0) {
        return 'https://telegra.ph/file/2a06381b260c3f096a612.jpg';  // Default image URL
    }
    
    // Select a random image from the filtered list
    const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
    
    // Return the full path of the selected image
    return path.join(assetsFolder, randomImage);
}

cmd({
    pattern: "about",
    react: "👑",
    desc: "Get bot owner description and information.",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let aboutInfo = `
🌟 *About the Bot and Developer* 🌟

---

👤 *Hello, ${pushname}!*  
I am *KINGVON-MD-V1 Bot*, a WhatsApp bot designed to help you with a variety of tasks.

---

🧑‍💻 *Developer Information:*
- *Name:* KINGVON
- *Age:* 19
- *Location:* THIKA
- *Field of Study:* Software Engineering Student
- *Skills:* Self-taught Developer with expertise in JavaScript, Node.js, and Bot Development

---

🚀 *About the Bot:*
- *Bot Name:* KINGVO-MD-V1 Bot
- *Purpose:* This bot is an open-source project, developed for educational purposes, to enhance learning and provide a user-friendly experience with WhatsApp automation.
- *Features:* It offers a variety of commands for entertainment, utility, and educational purposes, such as downloading media, converting files, and more!

---

🎓 *My Mission:*  
The goal is to help people learn by creating open-source tools, and to provide educational resources through this bot. This project serves as a hands-on learning experience for me as a Software Engineering student.

---

🛠 *Bot Development & Open-Source:*
- The bot is built using Node.js and designed to be easily customizable. It can be expanded for various use cases like educational purposes, entertainment, and personal automation.

---

🔗 *Connect with Me:*
- *GitHub*: [Visit My GitHub](https://github.com/SilverTosh/KINGVON-MD-V1)
- *Twitter*: [@Von](https://twitter.com/Silvertosh)

---

💡 *Thank you for using KINGVON-MD-V1 Bot!*  
I hope this bot helps you learn, explore, and make your experience smoother. Your feedback is always appreciated!

> *Powered by KINGVON, Software Engineering Student*
`;

        // Get a random image from the assets folder
        const randomImagePath = getRandomImage();
        
        // Send the random image and the about info message
        await conn.sendMessage(from, { image: { url: randomImagePath }, caption: aboutInfo }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
