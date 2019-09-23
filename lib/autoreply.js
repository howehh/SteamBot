// This module handles auto replying to messages

const bot = require('./bot');
const callbacks = require('./callbacks');

const state = {
   autoReplyMsg: null
}

function autoReply(data) {
   bot.chat(data.steamID, state.autoReplyMsg);
}

module.exports = {
   setAutoReplyMsg: function (msg) {
      state.autoReplyMsg = msg.replace(/_/g, " "); // replaces underscores with spaces
   },
   
   startAutoReply: function() {
      callbacks.addMsgEvent(autoReply);
   },
   
   handleCommand: function(args) {
      if (args !== undefined && args[3] !== undefined) {
         this.setAutoReplyMsg(args[3]);
         this.startAutoReply();
      } else {
         console.log("Usage: node index.js autoreply [message with underscore separators]");
         process.exit(1);
      }
   }
}