const { Client } = require("skribbler");

let prefix = "!";

function main() {
  const client = new Client({
      name: "CommanderBox",
      lobbyCode: "y1CK2v6n"//,
      // serverURL: "wss://server3.skribbl.io:5003"
  });

  client.on("connect", () => {
      console.log(`Connected to ${client.lobbyId}\nCurrent Player Count: ${client.players.length}`)
      client.sendMessage('CommanderBox connected successfully');
      client.sendMessage(`Use ${prefix}help to see all of my commands.`)
  });

  client.on("text", (data) => {
      if (data.msg.startsWith(`!ping`)) {
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
            client.sendMessage('Please specify a valid username after !votekick command');
        }
        return;
    }

    if (data.msg.startsWith(`${prefix}prefix`)) {
        const newPrefix = data.msg.split(' ')[1]; // Assuming the new prefix is the second word after the !setprefix command
        if (newPrefix) {
            prefix = newPrefix; // Update the prefix
            client.sendMessage(`Prefix updated to: ${prefix}`);
        } else {
            client.sendMessage('Please specify a new prefix after !prefix command');
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
          client.sendMessage('Copying is now enabled for !say command.');

          client.on('text', (data) => {
              if (data.msg === 'Copying is now enabled for !say command.') return;
              if (data.msg) {
                  copiedMessage = data.msg; // Save the message content
              }
          });
        
        return;
      }

      if (data.msg.startsWith(`${prefix}copy`)) {
          if (copiedMessage !== "") {
              client.sendMessage(copiedMessage); // Send the copied message
          } else {
              client.sendMessage('No message to copy, do !say then say a message after usage.');
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
          client.sendMessage(`Version: v1.0.0`);
        }, 6000)

        setTimeout(() => {
          client.sendMessage('socket-io-client version: v4.7.2');
        }, 9000)

        return;
      }

      if (data.msg.startsWith(`${prefix}help`)) {
        client.sendMessage('Grabbing the latest help...');

        setTimeout(() => {
          client.sendMessage(`ping - returns with pong`);
          client.sendMessage(`pick - automatically picks a word when drawing; improving speeds & making people less mad.`);
        }, 3000)

        setTimeout(() => {
          client.sendMessage(`draw - draws the discord this was made by.`);
          client.sendMessage(`say - live logging of other messages`);
        }, 6000)

        setTimeout(() => {
          client.sendMessage('info - gives you basic information about the lobby.');
          client.sendMessage('help - gives you information on how to use CommanderBox');
        }, 9000)

        setTimeout(() => {
          client.sendMessage('votekick - vote kicks a user, you must include a username.');
          client.sendMessage('prefix - changes the prefix.');
        }, 12000)

        setTimeout(() => {
          client.sendMessage('leave - disconnects the bot & quits the program.');
          client.sendMessage(`The current prefix is "${prefix}", that's what you put in front of the commands to use them with.`)
        }, 16000)

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
              client.sendMessage('Invalid command. Please try again or use !help.');
          }
      }
  });

  client.on("disconnect", (data) => {
      console.log("Disconnected", data);

      main();
  });
}

main();