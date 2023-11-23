const { Client } = require("skribbler");

let prefix = "!";

function main() {
  const client = new Client({
      name: "CommanderBox",
      lobbyCode: ""
  });

  client.on("connect", () => {
      console.log(`Connected to ${client.lobbyId}\nCurrent Player Count: ${client.players.length}`);
      client.sendMessage('CommanderBox connected successfully');
      client.sendMessage(`Use ${prefix}help to see the list of my commands.`)''
  });

  client.on("text", (data) => {
    if (data.player.name === client.options.name) return;
    
    if (data.msg.startsWith(`${prefix}prefix`)) {
        const newPrefix = data.msg.split(' ')[1]; // Assuming the new prefix is the second word after the !prefix command
      
      if (typeof newPrefix !== "string") {
        client.sendMessage('Error: Prefix is not defined.');
        return;
      }
      
      if (newPrefix.match(/^[!@#$%^&*_\-+=:.<>/?\\]+$/)) {
          prefix = newPrefix; // Update the prefix
          client.sendMessage(`Prefix updated to: ${prefix}`);
      } else {
          client.sendMessage('Please specify a new prefix after !prefix command. (no letters or numbers)');
      }
        return;
    }
    
      if (data.msg.startsWith(`${prefix}ping`)) {
          client.sendMessage('Pong');

          return;
      }

    if (data.msg.startsWith(`${prefix}votekick`)) {
        const username = data.msg.split(' ')[1]; // Assuming that the username is the second word after the !votekick command
        if (username) {
            const player = client.players.find(player => player.name === username);
            if (player) {
                client.votekick(player.id);
                client.sendMessage(`I voted to kick ${player.name}.`)
            } else {
                client.sendMessage('Invalid username, try again.');
            }
        } else {
            client.sendMessage(`Please specify a valid username after ${prefix}votekick`);
        }
        return;
    }

    if (data.msg.startsWith(`${prefix}userinfo`)) {
        const username = data.msg.split(' ')[1]; // Assuming that the username is the second word after the !userinfo command
        if (username) {
            const player = client.players.find(player => player.name === username);
            if (player) {
                client.sendMessage(`Getting the latest on ${player.name}...`);

              setTimeout(() => {
                client.sendMessage(`Name: ${player.name}`);
                client.sendMessage(`ID: ${player.id}`);
              }, 3000)
              
              setTimeout(() => {
                client.sendMessage(`Score: ${player.score}`);
                client.sendMessage(`Avatar: [${player.avatar}]`);
              }, 6000)

              setTimeout(() => {
                client.sendMessage(`Guessed: ${player.guessed}`);
                client.sendMessage(`Flags: ${player.flags}`);
              }, 9000)
            } else {
                client.sendMessage('Invalid username, try again.');
            }
        } else {
            client.sendMessage(`Please specify a valid username after ${prefix}userinfo`);
        }
        return;
    }

      if (data.msg.startsWith(`${prefix}pick`)) {
          client.sendMessage(`Action completed, this'll happen automatically from now on.`);

          client.on("chooseWord", (word) => {
              client.selectWord(word[0]);
          });

          client.selectWord(0);

          return;
      }

      if (data.msg.startsWith(`${prefix}draw`)) {
          const data = require("./drawings/discord.json");

          let draw = [];

          for (const drawing of data) {
            draw.push(drawing);

            if(draw.length < 7) continue;

            client.sendPacket(19, draw);

            draw = [];
          }

          return;
      }

      if (data.msg.startsWith(`${prefix}say`)) {
        const msg = data.msg.split(' ')[1]; // Assuming that the username is the second word after the !say command
        if(msg) {
          client.sendMessage(msg);
        } else {
          client.sendMessage("There wasn't a message to say.");
        }
        
        return;
      }

      if (data.msg.startsWith(`${prefix}info`)) {
        client.sendMessage('Grabbing the latest information...');

        setTimeout(() => {
          client.sendMessage(`Online Players: ${client.players.length ?? "N/A"}`);
          client.sendMessage(`Current Drawer: ${client.currentDrawer?.name ?? "N/A"}`);
        }, 3000)

        setTimeout(() => {
          client.sendMessage(`Lobby Code: ${client.lobbyId}`);
          client.sendMessage(`Version: v1.0.1`);
        }, 6000)

        setTimeout(() => {
          client.sendMessage('socket-io-client version: v4.7.2');
        }, 9000)

        return;
      }

      if (data.msg.startsWith(`${prefix}help`)) {
        client.sendMessage('Grabbing the latest help...');

        setTimeout(() => {
          client.sendMessage(`${prefix}ping - returns with pong`);
          client.sendMessage(`${prefix}pick - automatically picks a word when drawing; improving speeds & making people less mad.`);
        }, 3000)

        setTimeout(() => {
          client.sendMessage(`${prefix}draw - draws the discord this was made by.`);
          client.sendMessage(`${prefix}say - says what you want it to say`);
        }, 6000)

        setTimeout(() => {
          client.sendMessage(`${prefix}info - gives you basic information about the lobby.`);
          client.sendMessage(`${prefix}help - gives you information on how to use CommanderBox`);
        }, 9000)

        setTimeout(() => {
          client.sendMessage(`${prefix}votekick - vote kicks a user, you must include a username.`);
          client.sendMessage(`${prefix}prefix - changes the prefix.`);
        }, 12000)

        setTimeout(() => {
          client.sendMessage(`${prefix}userinfo - gives you basic user information, you must include a username.`);
        }, 16000)

        setTimeout(() => {
          client.sendMessage(`${prefix}leave - disconnects the bot & quits the program.`);
          client.sendMessage(`The current prefix is "${prefix}".`)
        }, 22000)

        return;
      }

      if (data.msg.startsWith(`${prefix}leave`)) {
          client.sendMessage('Disconnected by Command Execution.');

          setTimeout(() => {
              client.disconnect();
              process.exit(0);
          }, 3)

          return;
      } else {
          if (data.msg.startsWith(`${prefix}`)) {
              client.sendMessage(`Invalid command. Please try again or use ${prefix}help.`);
          }
      }
  });

  client.on("disconnect", (data) => {
      console.log("Disconnected", data);

      main();
  });
}

main();