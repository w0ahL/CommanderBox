module.exports = {
    name: 'pick',
    description: 'Pick command',
    execute(data, client, prefix) {
      if (data.msg.startsWith(`${prefix}pick`)) {
          client.sendMessage(`Action completed, this'll happen automatically from now on.`);

          client.on("chooseWord", (word) => {
              client.selectWord(word[0]);
          });

          client.selectWord(0);

          return;
      }
    },
};