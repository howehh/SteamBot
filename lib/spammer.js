// This module when activated will message a given user on a set interval with a set of scripted messages 

const axios = require('axios');
const bot = require('./bot');

let arrIndex = 0;

function sendMessage(userID, messagesPaste) {
   // Gets a list of messages from raw pastebin (label array as "msgs")
   axios.get("https://pastebin.com/raw/" + messagesPaste).then(function(response) {
      bot.chat(userID, response.data.msgs[arrIndex]);
      if (++arrIndex === response.data.msgs.length) arrIndex = 0;
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
   }
}