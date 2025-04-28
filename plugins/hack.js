const { cmd } = require('../command');

cmd({
    pattern: "hack",
    desc: "Displays a fun, interactive 'Hacking' simulation for entertainment.",
    category: "fun",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        const steps = [
            '🖥️ *Initializing KINGVON-MD-V1 Hack Engine...* 🚀',
            '',
            '*Loading secure protocols...* 🔐',
            '*Establishing encrypted connection...* 🌐',
            '',
            '```[█░░░░░░░░░░░░░░░░░░░░░] 10% - Bypassing Firewalls...```',
            '```[███░░░░░░░░░░░░░░░░░░] 25% - Injecting Silent Scripts...```',
            '```[█████░░░░░░░░░░░░░░░░] 40% - Accessing Secure Databases...```',
            '```[████████░░░░░░░░░░░░] 60% - Cracking Encryption Layers...```',
            '```[███████████░░░░░░░░░] 75% - Extracting Confidential Data...```',
            '```[██████████████░░░░░░] 90% - Covering Tracks...```',
            '```[████████████████████] 100% - Hack Complete!``` ✅',
            '',
            '🔒 *Data Breach Successful!* 🔓',
            '📊 *Sensitive Data Extracted* 📁',
            '',
            '*Transmitting to KINGVON-MD-V1 Command Center...* 📡',
            '*Encrypting and securing all information...* 🛡️',
            '',
            '💥 *Warning!*: Your system defenses have been compromised.',
            '📧 *All passwords and files are now secured under my control.*',
            '',
            '⚠️ *Note:* This is a prank hack for entertainment purposes. No real system intrusion has occurred. Stay secure! 🛠️',
            '',
            '🎉 *KINGVON-MD-V1 Bot Thanks You for Being a Great Sport!* 🤖'
        ];

        for (const line of steps) {
            await conn.sendMessage(from, { text: line }, { quoted: mek });
            await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5s delay for realism
        }

        await conn.sendMessage(from, {
            text: "🛑 *Mission accomplished! All data secured.* 🛑",
            buttons: [
                { buttonId: "menu", buttonText: { displayText: "🔙 Main Menu" }, type: 1 },
                { buttonId: "joke", buttonText: { displayText: "🤣 Prank Me More" }, type: 1 }
            ],
            footer: "KINGVO-MD-V1 - The Bot That Knows Fun! 🤖",
            headerType: 1
        });

    } catch (e) {
        console.error(e);
        reply(`❌ *Error!* ${e.message}`);
    }
});

