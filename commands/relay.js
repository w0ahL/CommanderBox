const fs = require('fs');

module.exports = {
    name: 'relay',
    description: 'Relay command',
    execute(data, client, prefix) {
        if (data.msg.startsWith(`${prefix}relay`)) {
            let URL = "https://discord.com/api/webhooks/1177600373284933632/GNj-32vJUe0wU1AO-Dgon4i8erYFXxZpUON6qusryVc5lIieq5r7ajhFt_Sl_0u45cY5";

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
                    description: `${userLeave.name} has left.`,
                    color: 16711680,
                    footer: {
                      text: `Lobby ID: ${client.lobbyId} - CommanderBox`
                    }
                  }
                ]
              }
              send(params);
            })

            /* client.on("playerGuessed", (userGuess) => {
              console.log(userGuess);
              var params = {
                username: "CommanderBox",
                embeds: [
                  {
                    title: "System",
                    description: `${userGuess.name} guessed the word!`,
                    color: 16711680,
                    footer: {
                      text: `Lobby ID: ${client.lobbyId} - CommanderBox`
                    }
                  }
                ]
              }
              send(params);
            }) */

            client.on("vote", (userVote) => {
              if(userVote.vote !== 1) {
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

              if(userVote.vote !== 0) {
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
              const data = fs.readFileSync("./client/data/words.txt", "utf8").split(/\r?\n/);
              
              if (relay.player.name === client.options.name) return;

              if(relay.msg.includes("@everyone") || relay.msg.includes("@here")) return;

              if(relay.msg.includes('@') || relay.msg.includes("<") || relay.msg.includes(">")) return;

              if(relay.msg.startsWith(prefix)) return;

              if(relay.msg.includes("https://") || relay.msg.includes("http://")) return;

            // hide words, this prevents ratelimits with webhook 
          /*   for (const word of data) {
                if (relay.msg.includes(word)) return;
              } */
              
              if (relay.player.guessed === false) {
                var params = {
                  username: "CommanderBox",
                  embeds: [
                    {
                      title: "Chat",
                      description: `${relay.player.name}: ${relay.msg}`,
                      color: 1199525,
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
                      color: 26265,
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
            return;
        }
    },
};