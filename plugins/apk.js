const { cmd } = require('../command');
const { fetchJson } = require('../lib/functions');

// Command registration for downloading APKs
cmd({
    pattern: "apkdown",
    alias: ["apk", "apkd", "appdownload"],
    desc: "Download APK files from the web",
    category: "download",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, q, reply
}) => {
    try {
        // Check if the user has provided an app name
        if (!q) return reply("❗ Please provide the name of the app you want to download.");
        
        reply("🔍 Searching for the app...");

        // Fetch search results for the provided app name
        const searchResults = await fetchJson(`https://bk9.fun/search/apk?q=${q}`);
        if (!searchResults || !searchResults.name || searchResults.name.length === 0) {
            return reply("⚠️ No results found. Please check the app name and try again.");
        }

        const appId = searchResults.name[0].id;
        
        // Fetch the download link using the app ID
        const appData = await fetchJson(`https://bk9.fun/download/apk?id=${appId}`);
        const downloadLink = appData?.name?.dllink;
        const fileName = appData?.name?.name || "download.apk";

        if (!downloadLink) {
            return reply("❌ Failed to retrieve the download link. Please try again later.");
        }

        // Inform the user that the download is starting
        reply("♻️ Downloading APK...\nPlease wait...");

        // Send the APK file as a document
        await conn.sendMessage(from, {
            document: { url: downloadLink },
            fileName: `${fileName}.apk`,
            mimetype: 'application/vnd.android.package-archive',
            caption: `📦 *Download Complete!*\nApp: *${fileName}*\n\n🎉 Powered by *KINGVON-MD-V1* 🤖`
        }, { quoted: mek });

    } catch (error) {
        console.error("Error:", error);
        reply(`❌ An error occurred: ${error.message}`);
    }
});

