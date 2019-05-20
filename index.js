// Imports
const spammer = require('./lib/spammer');
const bot = require('./lib/bot');
const autoReply = require('./lib/autoreply');

// Login message when successfully logged in
bot.client.on('loggedOn', function() {
   console.log("Login successful");
   startProcess();
});

// Run a module based on command line args
function startProcess() {
   switch(process.argv[2]) {
      case "spam":
         const userID = process.argv[3];
         const pastebinID = process.argv[4];
         const seconds = process.argv[5];
         if (userID !== undefined && pastebinID !== undefined && seconds !== undefined) {
            spammer.startSpam(userID, pastebinID, seconds);
         } else {
            console.log("Usage: node index.js spam [steamID] [pastebin ID] [spam interval]");
            process.exit(1);
         }
         break;
      case "autoreply":
         if (process.argv[3] !== undefined) {
            autoReply.setAutoReplyMsg(process.argv[3]);
            autoReply.startAutoReply();
         } else {
            console.log("Usage: node index.js autoreply [message with underscore separators]");
            process.exit(1);
         }
         break;
      default:
         console.log("Usage: node index.js [arg 1] [arg 2] ... [arg n]\n");
         process.exit(1);
   }
}