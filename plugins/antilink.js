const config = require('../config');
const { cmd, commands } = require('../command');

// Flag to enable/disable anti-link feature
let antiLinkEnabled = false;

cmd({
    pattern: "antilink",
    desc: "Enable or disable anti-link feature.",
    react: "🔗",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Only bot owner can toggle anti-link
        if (!isOwner) return reply("❌ Only the bot owner can enable or disable the anti-link feature.");
        
        // Check if argument is 'on' or 'off'
        if (args[0] === "on") {
            antiLinkEnabled = true;
            reply("✅ Anti-link feature is now enabled. Users who send invite links will be automatically kicked.");
        } else if (args[0] === "off") {
            antiLinkEnabled = false;
            reply("✅ Anti-link feature is now disabled. Users will no longer be automatically kicked for sending invite links.");
        } else {
            reply("❌ Invalid argument. Use `/antilink on` to enable or `/antilink off` to disable.");
        }
    } catch (e) {
        console.error("Error toggling anti-link:", e);
        reply("❌ An error occurred while trying to toggle the anti-link feature.");
    }
});

// Monitor for messages with links in the group
cmd({
    pattern: '.*',  // Matches all messages
    desc: "Monitor for WhatsApp group invite links",
    react: "🔗",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Check if anti-link is enabled
        if (!antiLinkEnabled) return;  // If the feature is disabled, exit early

        // Only execute in a group
        if (!isGroup) return;

        // Check if the message contains a WhatsApp group invite link
        const linkPattern = /https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]{20,}/;
        if (linkPattern.test(body)) {
            // If the bot is not an admin, notify the admins to give the bot admin privileges
            if (!isBotAdmins) {
                return reply("❌ Please give me admin privileges to kick the user who sent the invite link.");
            }

            // If a link is found, kick the sender of the message
            await conn.groupParticipantsUpdate(m.chat, [sender], "remove");

            // Notify the group that the user has been kicked
            reply(`❌ @${sender.split('@')[0]} sent a group invite link. They have been kicked from the group.`, { mentions: [sender] });
        }
    } catch (e) {
        console.error("Error checking links:", e);
        reply("❌ An error occurred while trying to monitor links.");
    }
});
                         
