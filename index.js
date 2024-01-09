const Client = require('./client/gameClient.js')

function setupClient() {
  return new Client({
    name: "CommanderBox",
    lobbyCode: 'ecCDsnjF'
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