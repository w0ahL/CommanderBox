const
  Client = require('./client/gameClient.js'),
  fs = require('fs')

let
  prefix = "!"

function setupClient() {
  return new Client({
    name: "CommanderBox",
    lobbyCode: Client.generateCode()
  });
}

// ---


function main() {
  const client = setupClient();
  client.registerEventHandlers();
}


// ---


main();