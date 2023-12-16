const
  Client = require('./client/gameClient.js'),
  fs = require('fs')

require('dotenv').config();

let prefix = process.env.PREFIX;

function setupClient() {
  return new Client({
    name: "CommanderBox",
    lobbyCode: 'NECCSmUt'
  });
}

function main() {
  const client = setupClient();
  
  client.registerEventHandlers();
  
  client.on("disconnect", () => {
    console.log('Rejoining in 3 seconds...');
    
    setTimeout(() => {
      main();
    }, 3000)
  })
}

main();