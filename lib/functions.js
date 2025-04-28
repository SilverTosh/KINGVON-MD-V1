/*
* coded by Kingvon
*/



// Importing the axios library for making HTTP requests
const axios = require('axios')

// Helper function to fetch data as a buffer from a URL
const getBuffer = async(url, options) => {
	try {
		options ? options : {} // If no options are provided, use an empty object
		var res = await axios({
			method: 'get', // Using GET method to fetch the data
			url, // URL provided as input
			headers: { // Setting headers for the request
				'DNT': 1, // Do Not Track header to request not to track the user
				'Upgrade-Insecure-Request': 1 // Request to upgrade to HTTPS if the page is HTTP
			},
			...options, // Adding any additional options passed by the user
			responseType: 'arraybuffer' // Set response type as arraybuffer (binary data)
		})
		return res.data // Returning the data from the response
	} catch (e) {
		console.log(e) // Logging any errors if they occur
	}
}

// Helper function to extract group admins from participant list
const getGroupAdmins = (participants) => {
	var admins = [] // Initialize an empty array to store admin IDs
	for (let i of participants) { // Loop through all participants in the group
		i.admin !== null  ? admins.push(i.id) : '' // If the participant is an admin, add their ID to the admins array
	}
	return admins // Return the array of admin IDs
}

// Helper function to generate a random number with a given file extension
const getRandom = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext}` // Generate a random number and append the given extension
}

// Function to format large numbers (e.g., converting 1000 to 1K, 1000000 to 1M)
const h2k = (eco) => {
	var lyrik = ['', 'K', 'M', 'B', 'T', 'P', 'E'] // Array of suffixes for large numbers
	var ma = Math.log10(Math.abs(eco)) / 3 | 0 // Get the scale (thousands, millions, etc.) based on logarithm
	if (ma == 0) return eco // If no scale is found, return the original value
	var ppo = lyrik[ma] // Get the appropriate suffix based on scale
	var scale = Math.pow(10, ma * 3) // Get the scaling factor (1000, 1000000, etc.)
	var scaled = eco / scale // Scale down the number
	var formatt = scaled.toFixed(1) // Format the number to one decimal place
	if (/\.0$/.test(formatt)) // If the formatted number ends with ".0"
		formatt = formatt.substr(0, formatt.length - 2) // Remove the ".0"
	return formatt + ppo // Return the formatted number with the suffix
}

// Helper function to check if a string is a valid URL
const isUrl = (url) => {
	return url.match( // Use a regular expression to match a URL pattern
		new RegExp(
			/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/,
			'gi' // Global case-insensitive matching
		)
	)
}

// Helper function to return a JSON formatted string from an object
const Json = (string) => {
    return JSON.stringify(string, null, 2) // Convert the input object to a JSON string with indentation
}

// Function to convert seconds into a more readable format (e.g., 1 day, 2 hours)
const runtime = (seconds) => {
	seconds = Number(seconds) // Convert input to a number
	var d = Math.floor(seconds / (3600 * 24)) // Calculate days
	var h = Math.floor(seconds % (3600 * 24) / 3600) // Calculate hours
	var m = Math.floor(seconds % 3600 / 60) // Calculate minutes
	var s = Math.floor(seconds % 60) // Calculate seconds
	var dDisplay = d > 0 ? d + (d == 1 ? ' day, ' : ' days, ') : '' // Format days
	var hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : '' // Format hours
	var mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : '' // Format minutes
	var sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '' // Format seconds
	return dDisplay + hDisplay + mDisplay + sDisplay; // Return the complete formatted runtime
}

// Helper function to delay execution for a specified amount of time (in milliseconds)
const sleep = async(ms) => {
	return new Promise(resolve => setTimeout(resolve, ms)) // Delay execution for the specified time
}

// Function to fetch JSON data from a URL
const fetchJson = async (url, options) => {
    try {
        options ? options : {} // If no options are provided, use an empty object
        const res = await axios({
            method: 'GET', // Using GET method to fetch the data
            url: url, // URL provided as input
            headers: { // Set custom headers for the request
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36' // Default User-Agent header
            },
            ...options // Adding any additional options passed by the user
        })
        return res.data // Return the JSON data from the response
    } catch (err) {
        return err // Return any error that occurs during the fetch
    }
}

// Exporting all the utility functions as a module for use in other parts of the application
module.exports = { 
    getBuffer, // Fetch data as buffer
    getGroupAdmins, // Get group admins from participant list
    getRandom, // Generate a random number with file extension
    h2k, // Format large numbers into a human-readable form
    isUrl, // Check if a string is a valid URL
    Json, // Convert an object to a formatted JSON string
    runtime, // Convert seconds to a readable time format
    sleep, // Delay execution for a given time
    fetchJson // Fetch JSON data from a URL
  }
  
