const { cmd, commands } = require('../command');
const axios = require('axios'); // Make sure to install axios
const config = require('../config');

// Replace this with your OpenAI API Key from https://platform.openai.com/signup
const OPENAI_API_KEY = 'sk-GfSYqPtsUfEAqzPnkNSfPXwLcXNtB9eV2kwUdQJG-ZT3BlbkFJLNqMSmAkFOupZsbgtcf8WZIXcOPx1ZEi-tIMV12sQA';

cmd({
    pattern: "ai",
    alias: ["gpt", "chatgpt", "bot"],
    react: "📑",
    desc: "Chat with AI using OpenAI GPT.",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Validate that the user provided a prompt
        if (!q) return reply("❗ Please provide a prompt for the AI chat.");

        // Send a request to OpenAI GPT API
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'text-davinci-003', // You can change this to any other model you prefer (e.g., gpt-3.5-turbo)
            prompt: q,
            max_tokens: 150,  // Max length of the response
            temperature: 0.7,  // Controls randomness
            n: 1,  // Number of responses
            stop: null,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`, // Authorization header with your API key
            }
        });

        // Extract AI response
        const aiResponse = response.data.choices[0].text.trim();

        // Send the AI's response back to the user
        reply(`💬 *AI Response:*\n\n${aiResponse}`);

    } catch (e) {
        console.error(e);
        reply(`❌ An error occurred: ${e.message}`);
    }
});


