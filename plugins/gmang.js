const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "kickall",
    desc: "Kicks all non-admin members from the group.",
    react: "👏",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Check if the user is an admin
        if (!isAdmins) return reply("❌ Only admins can use this command.");

        // Check if the user is the bot owner
        if (!isOwner) return reply("❌ Sorry, only the bot owner can use this command.");

        // Ensure the command is being used in a group
        if (!isGroup) return reply("❌ This command is only available in groups.");

        // Check if the bot has admin privileges
        if (!isBotAdmins) return reply("❌ I need admin privileges to kick members.");

        // Get all participants in the group
        const allParticipants = groupMetadata.participants;

        // Filter out the admins (including the bot)
        const nonAdminParticipants = allParticipants.filter(member => !groupAdmins.includes(member.id));
        
        // If no non-admin members to kick, inform the admin
        if (nonAdminParticipants.length === 0) {
            return reply("✅ There are no non-admin members to kick.");
        }

        // Start kicking non-admin members
        for (let participant of nonAdminParticipants) {
            await conn.groupParticipantsUpdate(m.chat, [participant.id], "remove");
        }

        // Confirm the action
        reply("✅ Successfully kicked all non-admin members from the group.");

    } catch (e) {
        console.error("Error kicking users:", e);
        reply("❌ An error occurred while trying to kick members. Please try again later.");
    }
});

cmd({
    pattern: "kick",
    desc: "Kicks a user from the group by replying to their message.",
    react: "👢",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Check if the user is an admin
        if (!isAdmins) return reply("❌ Only admins can use this command.");

        // Ensure the command is being used in a group
        if (!isGroup) return reply("❌ This command is only available in groups.");

        // Ensure the bot has admin privileges
        if (!isBotAdmins) return reply("❌ I need admin privileges to kick members.");

        // Check if the admin is replying to a user
        if (!quoted) return reply("❌ Please reply to the message of the user you want to kick.");

        // Get the user ID from the quoted message
        const mentionedUser = quoted.sender;

        // Kick the mentioned user
        await conn.groupParticipantsUpdate(m.chat, [mentionedUser], "remove");

        // Confirm the action
        reply(`✅ Successfully kicked @${mentionedUser.split('@')[0]} from the group.`, { mentions: [mentionedUser] });

    } catch (e) {
        console.error("Error kicking user:", e);
        reply("❌ An error occurred while trying to kick the user. Please try again later.");
    }
});

