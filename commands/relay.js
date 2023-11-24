const fs = require('fs');

const words = fs.readFileSync("./client/data/words.txt", "utf8").split(/\r?\n/);

module.exports = {
    name: 'relay',
    description: 'Relay command',
    execute(data, client, prefix) {
        if (data.msg.startsWith(`${prefix}relay`)) {
          let URL = "DISCORD WEBHOOK URL GOES HERE";

          var connectedParams = {
            username: "CommanderBox",
            embeds: [
              {
                title: "System",
                description: `Relay connected`,
                color: 65280,
                footer: {
                  text: `Lobby ID: ${client.lobbyId} - CommanderBox`
                }
              }
            ]
          }

          send(connectedParams);

            client.on("playerJoin", (userJoin) => {
              var params = {
                username: "CommanderBox",
                embeds: [
                  {
                    title: "System",
                    description: `${userJoin.name} has joined.`,
                    color: 65280,
                    footer: {
                      text: `Lobby ID: ${client.lobbyId} - CommanderBox`
                    }
                  }
                ]
              }
              send(params);
            })

            client.on("playerLeave", (userLeave) => {
              var params = {
                username: "CommanderBox",
                embeds: [
                  {
                    title: "System",
                    description: `${userLeave.player.name} has left the room.`,
                    color: 16711680,
                    footer: {
                      text: `Lobby ID: ${client.lobbyId} - CommanderBox`
                    }
                  }
                ]
              }
              send(params);
            })

            client.on("playerGuessed", (userGuess) => {
              var params = {
                username: "CommanderBox",
                embeds: [
                  {
                    title: "System",
                    description: `${userGuess.player.name} guessed the word!`,
                    color: 65280,
                    footer: {
                      text: `Lobby ID: ${client.lobbyId} - CommanderBox`
                    }
                  }
                ]
              }
              send(params);
            })

            client.on("hintRevealed", () => {
              var params = {
                username: "CommanderBox",
                embeds: [
                  {
                    title: "System",
                    description: `A Hint was Revealed!`,
                    color: 16776960,
                    footer: {
                      text: `Lobby ID: ${client.lobbyId} - CommanderBox`
                    }
                  }
                ]
              }
              send(params);
            })

            client.on("roundStart", () => {
              var params = {
                username: "CommanderBox",
                embeds: [
                  {
                    title: "System",
                    description: `A new round has started!`,
                    color: 65280,
                    footer: {
                      text: `Lobby ID: ${client.lobbyId} - CommanderBox`
                    }
                  }
                ]
              }
              send(params);
            })


            client.on("vote", (userVote) => {
              if(userVote.vote === 1) {
              var params = {
                username: "CommanderBox",
                embeds: [
                  {
                    title: "System",
                    description: `${userVote.player.name} liked the drawing!`,
                    color: 65280,
                    footer: {
                      text: `Lobby ID: ${client.lobbyId} - CommanderBox`
                    }
                  }
                ]
              }
              send(params);
              }

              if(userVote.vote === 0) {
                var params = {
                  username: "CommanderBox",
                  embeds: [
                    {
                      title: "System",
                      description: `${userVote.player.name} disliked the drawing!`,
                      color: 16711680,
                      footer: {
                        text: `Lobby ID: ${client.lobbyId} - CommanderBox`
                      }
                    }
                  ]
                }
                send(params);
                }
            })

            client.on("text", (relay) => {
              if (relay.player.name === client.options.name) return;

              if(relay.msg.includes("@everyone") || relay.msg.includes("@here")) return;

              if(relay.msg.includes('@') || relay.msg.includes("<") || relay.msg.includes(">")) return;

              if(relay.msg.startsWith(prefix)) return;

             // prevent auto-guessers from ruining the webhook 
             /* for (const word of words) {
                if (relay.msg === word) return;
              } */
              
              if (relay.player.guessed === false) {
                var params = {
                  username: "CommanderBox",
                  embeds: [
                    {
                      title: "Chat",
                      description: `${relay.player.name}: ${relay.msg}`,
                      color: 16777215,
                      footer: {
                        text: `Lobby ID: ${client.lobbyId} - CommanderBox`
                      }
                    }
                  ]
                }
                send(params);
              };

              if (relay.player.guessed === true) {
                var params = {
                  username: "CommanderBox",
                  embeds: [
                    {
                      title: "Hidden Chat",
                      description: `${relay.player.name}: ${relay.msg}`,
                      color: 65280,
                      footer: {
                        text: `Lobby ID: ${client.lobbyId} - CommanderBox`
                      }
                    }
                  ]
                }
                
                send(params);
              };
            });

          function send(params) { 
            fetch(URL, {
               method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(params)
            })
          }
          
            client.sendMessage('Relaying all chat messages to discord, you must set the webhook URL in the relay command file.');
            client.sendMessage('It is not recommended to do this in public lobbies just yet.');
        }
    },
};