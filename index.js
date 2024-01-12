const Client = require('./client/gameClient.js')

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