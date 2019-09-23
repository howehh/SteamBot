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
         spammer.handleCommand(process.argv);
         break;
      case "autoreply":
         autoReply.handleCommand(process.argv);
         break;
      default:
         console.log("Usage: node index.js [arg 1] [arg 2] ... [arg n]\n");
         process.exit(1);
   }
}