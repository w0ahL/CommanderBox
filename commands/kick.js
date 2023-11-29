module.exports = {
    name: 'kick',
    description: 'kick command',
    execute(data, client, prefix) {
      if (data.msg.startsWith(`${prefix}kick`)) {
          const username = data.msg.split(' ')[1];
          if (username) {
            const player = client.players.find(player => player.name.toLowerCase() === username.toLowerCase());
              if (player) {
                  client.hostKick(player.id);
                  client.sendMessage(`I kicked ${player.name}, If I have host permissons of course.`);
              } else {
                  client.sendMessage('Invalid username, try again.');
              }
          } else {
              client.sendMessage(`Please specify a valid username after ${prefix}kick`);
          }
          return;
      }
    },
};