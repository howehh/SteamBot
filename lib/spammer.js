const axios = require('axios');

let arrIndex = 0;

function sendMessage(client, userID, messagesPaste) {
   // Gets a list of messages from raw pastebin (label array as "msgs")
   axios.get("https://pastebin.com/raw/" + messagesPaste).then(function(response) {
      client.chatMessage(userID, response.data.msgs[arrIndex]);
      if (++arrIndex === response.data.msgs.length) arrIndex = 0;
   });
}

module.exports = {
   // Starts an interval to spam a given steam user
   // client = SteamUser object that is logged in
   // userID = ID of user to spam
   // messagesPaste = pastebin ID of an array of scripted messages
   // seconds = the interval to spam at
   startSpam: function(client, userID, messagesPaste, seconds) {
      setInterval(function() {
         sendMessage(client, userID, messagesPaste);
      }, seconds * 1000);
   }
}