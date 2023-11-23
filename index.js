const { Client } = require("skribbler");
const fs = require('fs');

let prefix = "!";

function main() {
  const client = new Client({
      name: "CommanderBox",
      lobbyCode: "lfCGjZl1"
  });

  const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

  client.on("connect", () => {
      console.log(`Connected to ${client.lobbyId}\nCurrent Player Count: ${client.players.length}`);
    
      client.sendMessage(`Use ${prefix}help to see the list of my commands.`);
  });
  
  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
      client.on("text", (data) => {
          if (data.player.name === client.options.name) return;
    
          command.execute(data, client, prefix);

          if (data.msg.startsWith(`${prefix}prefix`)) {
              const newPrefix = data.msg.split(' ')[1]; // Assuming the new prefix is the second word after the !prefix command

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
              return;
          }
    });
}

  client.on("disconnect", (data) => {
      console.log("Disconnected", data);

      setTimeout(() => {
        console.log('Rejoining in 3 seconds...');
        main();
      }, 3000)
  });
}

main();