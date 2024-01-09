module.exports = {
    name: 'votekick',
    description: 'voteKick command',
    execute(data, client, prefix) {
      if (data.msg.toLowerCase().startsWith(`${prefix}votekick `)) {
        const username = data.msg.split(' ').slice(1).join(' '); // Assuming that the username is the second word after the !votekick command
          if (username) {
            const player = client.players.find(player => player.name.toLowerCase() === username.toLowerCase());
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