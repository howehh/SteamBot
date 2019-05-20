// This module handles auto replying to messages

const bot = require('./bot');
const callbacks = require('./callbacks');

let autoReplyMsg = "";

function autoReply(data) {
   bot.chat(data.steamID, autoReplyMsg);
}

module.exports = {
   setAutoReplyMsg: function (msg) {
      autoReplyMsg = msg.replace(/_/g, " "); // replaces underscores with spaces
   },
   
   startAutoReply: function() {
      callbacks.addMsgEvent(autoReply);
   }
}