const { Client } = require("skribbler");
const fs = require('fs');

let prefix = "!";

function setupClient() {
  return new Client({
    name: "CommanderBox",
    lobbyCode: "LbCd3hrR"
  });
}


function registerEventHandlers(client) {
  client.on("connect", () => handleConnect(client));
  client.on("disconnect", (data) => handleDisconnect(data));
  
  const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.on("text", (data) => handleText(data, command));
  }
}


function handleConnect(client) {
  console.log(`Connected to ${client.lobbyId}\nCurrent Player Count: ${client.players.length}`);
  client.sendMessage(`Use ${prefix}help to see the list of my commands.`);
}


function handleDisconnect(data) {
  console.log("Disconnected", data);
  setTimeout(() => {
    console.log('Rejoining in 3 seconds...');
    main();
  }, 3000);
}


function handleText(data, command) {
  if (data.player.name === client.options.name) return;

  command.execute(data, client, prefix);
  if (data.msg.startsWith(`${prefix}prefix`)) {
    updatePrefix(data.msg, client);
  }
}


function updatePrefix(msg, client) {
  const newPrefix = msg.split(' ')[1]; // Assuming the new prefix is the second word after the !prefix command

  if (typeof newPrefix !== "string") {
    client.sendMessage('Error: Prefix is not defined.');
    return;
  }

  if (newPrefix.match(/^[!@#$%^&*_\-+=:.<>/?\\]+$/) && newPrefix.length > 0) {
    prefix = newPrefix; // Update the prefix
    client.sendMessage(`Prefix updated to: ${prefix}`);
  } else {
    client.sendMessage('Please specify a new prefix after !prefix command. (no letters or numbers)');
  }
}


// ---


function main() {
  const client = setupClient();
  registerEventHandlers(client);
}


// ---


main();