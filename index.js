const
  Client = require('./client/gameClient.js'),
  fs = require('fs')

require('dotenv').config();


let prefix = process.env.PREFIX;

function setupClient() {
  return new Client({
    name: "CommanderBox",
    lobbyCode: ''
  });
}

function main() {
  const client = setupClient();
  client.registerEventHandlers();
}

main();