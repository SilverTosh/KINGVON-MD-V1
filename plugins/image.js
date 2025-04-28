const { cmd } = require('../command');
const axios = require('axios');

// Replace with your Google API key and CSE ID
const GOOGLE_API_KEY = 'AIzaSyDebFT-uY_f82_An6bnE9WvVcgVbzwDKgU'; 
const GOOGLE_CX = '45b94c5cef39940d1';

cmd({
    pattern: "img",
    alias: ["imgsearch", "gimg"],
    desc: "Search and retrieve images using Google API.",
    react: "🖼️",
    category: "media",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) {
            return reply("❗ *Please provide a search query to fetch images.*");
        }

        reply("🔍 *Searching for images... Please wait.*");

        // Fetch image URLs from Google Custom Search API
        const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(q)}&cx=${GOOGLE_CX}&key=${GOOGLE_API_KEY}&searchType=image&num=5`;
        const { data } = await axios.get(url);

        if (!data.items || data.items.length === 0) {
            return reply("❌ *No images found. Please try a different query.*");
        }

        // Loop through the first few images and send them
        for (const [index, item] of data.items.entries()) {
            const imageUrl = item.link;

            try {
                // Download the image as a buffer
                const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
                const imageBuffer = Buffer.from(imageResponse.data, 'binary');

                await conn.sendMessage(from, {
                    image: imageBuffer,
                    caption: `🌟 *Image ${index + 1} of ${q}*\n📷 *Source*: ${item.displayLink}`,
                }, { quoted: mek });

            } catch (err) {
                console.error(`Failed to send image ${index + 1}:`, err.message);
                continue;
            }
        }
        reply("✅ *Images sent successfully!*");

    } catch (error) {
        console.error("Error fetching images:", error.message);
        reply(`❌ *An error occurred:* ${error.message}`);
    }
});

