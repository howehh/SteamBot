// Chat message handler
const bot = require('./bot');

const msgEvents = [];

bot.client.on("friendMessage", function(steamID, message) {
   console.log("[" + getFormattedDate() + "] ID: " + steamID + ": " + message);
   msgEvents.forEach(msgEvent => msgEvent({"steamID": steamID, "message": message}));
});

function getFormattedDate() {
   let date = new Date();
   let minutes = (date.getMinutes() < 10) ? date.getMinutes() + "0" : date.getMinutes();
   let seconds = (date.getSeconds() < 10) ? date.getSeconds() + "0" : date.getSeconds();
   let str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() +
         " " +  date.getHours() + ":" + minutes + ":" + seconds;

   return str;
}

module.exports = {
   // Adds one function to chat events
   addMsgEvent: function(func) {
      msgEvents.push(func);
   },
   
   addMultipleMsgEvents: function(obj) {
      Object.keys(obj).forEach(key => {
         // only accepts functions with a parameter (data)
         if (key.length > 0 && msgEvents.indexOf(obj[key]) === -1) { 
            msgEvents.push(obj[key])
         }
      });
   }      
}

