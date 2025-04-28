const { cmd } = require('../command');
const axios = require('axios');

// Replace with your OpenAI API key
const OPENAI_API_KEY = 'sk-GfSYqPtsUfEAqzPnkNSfPXwLcXNtB9eV2kwUdQJG-ZT3BlbkFJLNqMSmAkFOupZsbgtcf8WZIXcOPx1ZEi-tIMV12sQA';

cmd({
    pattern: "ai",
    alias: ["gpt", "bot"], 
    react: "📑",
    desc: "AI chat using OpenAI GPT-3",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) {
            return reply("❗ Please provide a message for the AI to respond to.");
        }

        // Make the API request to OpenAI
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: "text-davinci-003", // You can also use other models such as gpt-3.5-turbo
            prompt: q,
            max_tokens: 150,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        // Get the AI's response from OpenAI API
        const aiResponse = response.data.choices[0].text.trim();
        return reply(aiResponse);

    } catch (e) {
        console.log(e);
        reply(`❌ An error occurred: ${e.message}`);
    }
});

