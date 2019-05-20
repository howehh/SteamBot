// This module logs the bot onto steam

const SteamUser = require('steam-user');
const config = require('./../config');

const steamClient = new SteamUser();

// Logs into steam
steamClient.logOn({
   accountName: config.username,
   password: config.password
});

module.exports = {
   client: steamClient,
   
   chat: function(userID, message) {
      steamClient.chatMessage(userID, message);
   }
}