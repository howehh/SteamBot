# SteamBot

This program will log onto your steam account and automate various things depending on what mood you're in

1. Install node.js
2. `npm install` to install node modules
3. Edit config.json with steam account name, password
4. Run the bot with `node index.js <arg1> <arg2> ... <argN>`

# Processes

**Spam**
Repeatedly send scripted messages to an annoying friend to make them think you care (use reponsibly)

Run with `node index.js spam [steamID of target] [pastebin ID] [interval in seconds]`

**Autoreply**
Specify a message that will be sent automatically when someone messages you

Run with `node index.js autoreply [message with words separated by underscores]`