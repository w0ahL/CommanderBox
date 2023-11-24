module.exports = {
    name: 'relay',
    description: 'Relay command',
    execute(data, client, prefix) {
        if (data.msg.startsWith(`${prefix}relay`)) {
            let URL = "";

            client.on("playerJoin", (joinData) => {
              console.log(joinData);
            })

            client.on("text", (relay) => {
              if (relay.player.name === client.options.name) return;

              if(relay.msg.includes("@everyone") || relay.msg.includes("@here")) return;

              if(relay.msg.includes('@') || relay.msg.includes("<") || relay.msg.includes(">")) return;

              if(relay.msg.startsWith(prefix)) return;

              let currentDrawer = client.currentDrawer.name.includes(relay.player.name) ?? "N/A";
              
              if (relay.player.guessed === false || currentDrawer === "N/A") {
                var params = {
                  username: "CommanderBox",
                  content: `[Normal Chat] ${relay.player.name}: ${relay.msg}`
                }
                send(params);
              };

              if (relay.player.guessed === true || currentDrawer != "N/A") {
                if(currentDrawer === "N/A") return;
                var params = {
                  username: "CommanderBox",
                  content: `[Hidden Chat] ${relay.player.name}: ${relay.msg}`
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