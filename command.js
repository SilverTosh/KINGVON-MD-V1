/*
 * Command Registration System
 *
 * Developer Info:
 * Author: KINGVON
 * Date: 1/5/2025
 * Version: 1.0.0
 * Description: This module is used for registering commands along with their metadata.
 *              Each command is associated with a description, category, and a function
 *              to execute. Commands are stored in an array and can be accessed through
 *              the exported module.
 *
 * Developer Note:
 * - This script is designed to add commands dynamically to a command list.
 * - The `cmd` function handles both the registration of the command and its metadata,
 *   ensuring that all required fields are set with default values when necessary.
 * - Aliases (`AddCommand`, `Function`, `Module`) are included to provide flexibility
 *   for calling the registration function.
 * - It is important to note that the `commands` array stores all the command data, which
 *   may be useful for listing, filtering, or executing commands later.
 * - You can extend this module to include more properties or validation logic based on
 *   the specific needs of your application.
 * - Ensure to validate the command metadata before registering to avoid errors later on.
 */

var commands = [];  // Initialize an empty array to store all the commands

// Define the `cmd` function that registers a command
function cmd(info, func) {
    var data = info;  // Create a copy of the `info` object to avoid directly modifying the original

    data.function = func;  // Assign the function passed in `func` to the `data.function` property

    // If the `dontAddCommandList` property is not set, default it to false
    if (!data.dontAddCommandList) data.dontAddCommandList = false;

    // If the description (`desc`) is not provided, set it to an empty string
    if (!info.desc) info.desc = '';

    // If `fromMe` is not provided, default it to false
    if (!data.fromMe) data.fromMe = false;

    // If the `category` property is not set, default it to 'misc'
    if (!info.category) data.category = 'misc';

    // If the `filename` property is not set, default it to "Not Provided"
    if (!info.filename) data.filename = "Not Provided";

    // Add the command's data to the `commands` array
    commands.push(data);

    // Return the `data` object (the registered command)
    return data;
}

// Export the `cmd` function and other aliases for it, along with the `commands` array
module.exports = {
    cmd,              // Export the `cmd` function for registering commands
    AddCommand: cmd,  // Alias for the `cmd` function
    Function: cmd,    // Another alias for the `cmd` function
    Module: cmd,      // Yet another alias for the `cmd` function
    commands,         // Export the list of registered commands
};
