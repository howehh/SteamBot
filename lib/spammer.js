// This module when activated will message a given user on a set interval with a set of scripted messages 

const axios = require('axios');
const bot = require('./bot');

const state = {
   arrIndex: 0
}

function sendMessage(userID, messagesPaste) {
   // Gets a list of messages from raw pastebin (label array as "msgs")
   axios.get("https://pastebin.com/raw/" + messagesPaste).then(function(response) {
      bot.chat(userID, response.data.msgs[state.arrIndex]);
      if (++state.arrIndex === response.data.msgs.length) state.arrIndex = 0;
   });
}

module.exports = {
   // Starts an interval to spam a given steam user
   // userID = ID of user to spam
   // messagesPaste = pastebin ID of an array of scripted messages
   // seconds = the interval to spam at
   startSpam: function(userID, messagesPaste, seconds) {
      setInterval(function() {
         sendMessage(userID, messagesPaste);
      }, seconds * 1000);
   },
   
   handleCommand: function(args) {
      const userID = args[3];
      const pastebinID = args[4];
      const seconds = args[5];
      if (userID !== undefined && pastebinID !== undefined && seconds !== undefined) {
         if (!isNaN(seconds) && seconds >= 5) {
            this.startSpam(userID, pastebinID, seconds);
         } else {
            console.log("Error: spam interval should be a number greater than 5 sec");
            process.exit(1);
         }
      } else {
         console.log("Usage: node index.js spam [steamID] [pastebin ID] [spam interval]");
         process.exit(1);
      }
   }
}