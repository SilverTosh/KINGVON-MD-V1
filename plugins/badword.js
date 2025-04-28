const { cmd } = require('../command');

// To store the blocked words and warnings
let blockedWords = [];
let userWarnings = {};

// Command to toggle filter and specify blocked words
cmd({
    pattern: "filter",
    desc: "Enable or disable the word filter with specific words.",
    react: "🚫",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Ensure the user is an admin
        if (!isAdmins) return reply("❌ Only admins can use this command.");

        // Check if the command has words specified
        const words = args.join(" ").split(",");
        if (words.length === 0) return reply("❌ Please provide words to filter.");

        // Set the blocked words
        blockedWords = words.map(word => word.trim().toLowerCase());
        reply(`✅ Word filter is now enabled with the following words: ${blockedWords.join(", ")}`);
    } catch (e) {
        console.error("Error toggling filter:", e);
        reply("❌ An error occurred while trying to enable the word filter.");
    }
});

// Command to add a word to the blocked list
cmd({
    pattern: "addword",
    desc: "Add a word to the blocked list.",
    react: "🚫",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Ensure the user is an admin
        if (!isAdmins) return reply("❌ Only admins can add words to the blocked list.");

        const newWord = args.join(" ").toLowerCase();
        if (!newWord) return reply("❌ Please provide a word to block.");

        // Add the word to the blocked list
        if (!blockedWords.includes(newWord)) {
            blockedWords.push(newWord);
            reply(`✅ The word "${newWord}" has been added to the blocked list.`);
        } else {
            reply(`❌ The word "${newWord}" is already in the blocked list.`);
        }
    } catch (e) {
        console.error("Error adding word:", e);
        reply("❌ An error occurred while trying to add the word.");
    }
});

// Command to remove a word from the blocked list
cmd({
    pattern: "removeword",
    desc: "Remove a word from the blocked list.",
    react: "✅",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Ensure the user is an admin
        if (!isAdmins) return reply("❌ Only admins can remove words from the blocked list.");

        const wordToRemove = args.join(" ").toLowerCase();
        if (!wordToRemove) return reply("❌ Please provide a word to remove.");

        // Remove the word from the blocked list
        blockedWords = blockedWords.filter(word => word !== wordToRemove);
        reply(`✅ The word "${wordToRemove}" has been removed from the blocked list.`);
    } catch (e) {
        console.error("Error removing word:", e);
        reply("❌ An error occurred while trying to remove the word.");
    }
});

// Monitor messages for blocked words
cmd({
    pattern: '.*',  // Matches all messages
    desc: "Monitor messages for blocked words",
    react: "🚫",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Only proceed if the filter is enabled
        if (blockedWords.length === 0) return; // No words to filter

        // Only proceed if the message is in a group
        if (!isGroup) return;

        // Check if the message contains any blocked words
        const messageLower = body.toLowerCase();
        const blockedWordFound = blockedWords.some(word => messageLower.includes(word));

        if (blockedWordFound) {
            // Check the user's warnings
            userWarnings[sender] = userWarnings[sender] || 0;
            userWarnings[sender]++;

            // Warn the user if they haven't reached 3 warnings yet
            if (userWarnings[sender] < 3) {
                await conn.sendMessage(from, { text: `❌ @${sender.split('@')[0]}, your message contained a blocked word and has been deleted. You now have ${userWarnings[sender]} warning(s).` }, { mentions: [sender] });
                await conn.deleteMessage(from, mek.key);
            } else {
                // If the user has reached 3 warnings, kick them from the group
                await conn.groupParticipantsUpdate(from, [sender], "remove");
                await conn.sendMessage(from, { text: `❌ @${sender.split('@')[0]} has been kicked for reaching 3 warnings for using blocked words.` }, { mentions: [sender] });
                delete userWarnings[sender];  // Reset the warning count after kicking
            }
        }
    } catch (e) {
        console.error("Error checking for blocked words:", e);
        reply("❌ An error occurred while trying to monitor messages.");
    }
});
          
