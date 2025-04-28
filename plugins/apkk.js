const gplay = require('google-play-scraper');
const { cmd } = require('../command');

cmd({
    pattern: "apkdll",
    alias: ["apkl", "apkdl", "appdownloadl"],
    desc: "Search for APK info from Google Play",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return reply("❗ Please provide the name of the app you want to search.");
        
        reply("🔍 Searching Google Play...");

        // Fetch metadata from Google Play
        const results = await gplay.search({ term: q, num: 1 });

        if (!results || results.length === 0) {
            return reply("⚠️ No apps found. Please check the app name and try again.");
        }

        const app = results[0];
        const appInfo = `📱 *App Info:*\n\n` +
            `*Name:* ${app.title}\n` +
            `*Developer:* ${app.developer}\n` +
            `*Rating:* ${app.scoreText}\n` +
            `*URL:* ${app.url}`;

        reply(appInfo);

        // You can also suggest external services for downloading
        reply(`🔗 You can download this app from trusted APK sites like APKPure.`);

    } catch (error) {
        console.error("Error:", error);
        reply(`❌ An error occurred: ${error.message}`);
    }
});

