module.exports = {
    name: 'userinfo',
    description: 'userInfo command',
    execute(data, client, prefix) {
      if (data.msg.startsWith(`${prefix}userinfo`)) {
          const username = data.msg.split(' ')[1]; // Assuming that the username is the second word after the !userinfo command
          if (username) {
              const player = client.players.find(player => player.name.toLowerCase() === username.toLowerCase());
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
    },
};