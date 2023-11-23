module.exports = {
    name: 'votekick',
    description: 'voteKick command',
    execute(data, client, prefix) {
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
    },
};