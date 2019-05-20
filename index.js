// Imports
const SteamUser = require('steam-user');
const config = require('./config');
const axios = require('axios');
const spammer = require('./lib/spammer');

const client = new SteamUser();

// Logs into steam
client.logOn({
   accountName: config.username,
   password: config.password
});

// Login message when successfully logged in
client.on('loggedOn', function() {
   console.log("Login successful");
   startProcess();
});

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

// Run a module based on command line args
function startProcess() {
   switch(process.argv[2]) {
      case "spam":
         const userID = process.argv[3];
         const pastebinID = process.argv[4];
         const seconds = process.argv[5];
         if (userID !== undefined && pastebinID !== undefined && seconds !== undefined) {
            spammer.startSpam(client, userID, pastebinID, seconds);
         } else {
            console.log("Usage: node index.js spam [steamID] [pastebin ID] [spam interval]");
         }
         break;
      default:
         console.log("Usage: node index.js [arg 1] [arg 2] ... [arg n]\n");
   }
}