/*
 * Bot Configuration Module
 *
 * Developer Info:
 * Author: KINGVON
 * Date: 1/5/2025
 * Version: 1.0.0
 * Description: This module is used for configuring and exporting various environment variables
 *              that control the behavior of the bot. Environment variables are loaded from a
 *              `.env` file, and default values are provided if they are not specified.
 *
 * Developer Note:
 * - This module allows easy customization of the bot's behavior using environment variables.
 * - Ensure to add the required `.env` file or set the environment variables manually.
 * - The `convertToBool` helper function is provided to convert string values into booleans,
 *   which can be useful for managing flags or boolean configurations.
 * - You can extend this module by adding more configurable settings based on your bot's needs.
 * - Make sure to keep sensitive information, such as API keys and session IDs, secure and not
 *   publicly exposed in the source code.
 */

const fs = require('fs');  // Importing the file system module to check for the existence of the .env file

// Check if the config.env file exists and load environment variables from it
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' }); 

// Helper function to convert a string to a boolean value
function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;  // Return true if the string matches 'true', otherwise return false
}

// Exporting the configuration settings as a module
module.exports = {
    // Bot session ID, can be set via environment variable or defaults to a placeholder
    SESSION_ID: process.env.SESSION_ID || "enter your session", 
    
    // Automatic read status, determines if the bot reads messages automatically (default is 'false')
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "false",

    // Bot mode (public or private), determines the visibility of the bot (default is 'private')
    MODE: process.env.MODE || "private",

    // Automatically convert voice messages to text (default is 'false')
    AUTO_VOICE: process.env.AUTO_VOICE || "false",

    // Automatically convert images to stickers (default is 'false')
    AUTO_STICKER: process.env.AUTO_STICKER || "false",

    // Enable automatic replies to incoming messages (default is 'false')
    AUTO_REPLY: process.env.AUTO_REPLY || "false",

    // Image URL for bot's "alive" image, displayed when the bot is online (can be customized)
    ALIVE_IMG: process.env.ALIVE_IMG || "https://telegra.ph/file/2a06381b260c3f096a612.jpg",

    // Alive message to be shown when the bot is online (can be customized)
    ALIVE_MSG: process.env.ALIVE_MSG || "HII DEAR IM ONLINE I'M KINGVON WHATSAPP BOT 😊👨‍💻",

    // Anti-link protection to prevent spam links (default is 'false')
    ANTI_LINK: process.env.ANTI_LINK || "false",

    // Anti-bad-word filter to prevent inappropriate content (default is 'false')
    ANTI_BAD: process.env.ANTI_BAD || "false",

    // Prefix for bot commands, used to trigger commands (default is '.')
    PREFIX: process.env.PREFIX || ".",

    // Fake recording indicator, used to show fake recording status (default is 'false')
    FAKE_RECORDING: process.env.FAKE_RECORDING || "false",

    // Enable automatic reactions to messages (default is 'false')
    AUTO_REACT: process.env.AUTO_REACT || "false",

    // Enable heart reactions specifically to messages (default is 'false')
    HEART_REACT: process.env.HEART_REACT || "false",

    // Special reactions for owner messages (default is 'false')
    OWNER_REACT: process.env.OWNER_REACT || "false",

    // Display name of the bot (can be customized)
    BOT_NAME: process.env.BOT_NAME || "➺KINGVON-MD-V1 Bot࿐",

    // OMDB API key for fetching movie-related information (default is a placeholder value)
    OMDB_API_KEY: process.env.OMDB_API_KEY || "76cb7f39", // omdbapi.com
};
  
