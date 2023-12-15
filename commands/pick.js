module.exports = {
    name: 'pick',
    description: 'Pick command',
    execute(data, client, prefix) {
      if (data.msg.startsWith(`${prefix}pick`)) {
          client.sendMessage(`Action completed, this'll happen automatically from now on.`);

        client.on("stateUpdate", (data) => {
          switch(data.state) {
            case 3: {
              if(!data.words) break;

              console.log(`Picked word ${data.words[0]}`);
              client.selectWord(data.words[0]);
              break;
            }
          }
        });

          client.selectWord(0);

          return;
      }
    },
};