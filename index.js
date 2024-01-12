const Client = require('./client/gameClient.js')

require("dotenv").config();

function setupClient() {
  return new Client({
    name: "CommanderBox",
    lobbyCode: process.env.LOBBY_CODE
  });
}

function main() {
  const client = setupClient();
  
  client.registerEventHandlers();
}

main();