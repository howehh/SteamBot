// Imports
const SteamUser = require('steam-user');
const config = require('./config');
const axios = require('axios');

const client = new SteamUser();

// Logs into steam
client.logOn({
   accountName: config.username,
   password: config.password
});

// Login message when successfully logged in
client.on('loggedOn', function() {
   console.log("Login successful");
});

// Gets a list of image links from raw pastebin (label array as "links")
let arrIndex = 0;

function sendMessage() {
   axios.get("https://pastebin.com/raw/" + config.pastebin).then(function(response) {
      client.chatMessage(config.targetID, response.data.links[arrIndex]);
      if (++arrIndex === response.data.links.length) arrIndex = 0;
   });
}

// Interval to spam the target ID 
setInterval(function() {
   sendMessage();
}, 60000);

// Logs a user's message to console
client.on("friendMessage", function(steamID, message) {
   console.log("[" + getFormattedDate() + "] ID: " + steamID + ": " + message);
});

function getFormattedDate() {
    let date = new Date();
    let minutes = (date.getMinutes() < 10) ? date.getMinutes() + "0" : date.getMinutes();
    let seconds = (date.getSeconds() < 10) ? date.getSeconds() + "0" : date.getSeconds();
    let str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() +
            " " +  date.getHours() + ":" + minutes + ":" + seconds;

    return str;
}