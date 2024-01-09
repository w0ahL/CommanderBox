module.exports = {
    name: 'ban',
    description: 'ban command',
    execute(data, client, prefix) {
      if (data.msg.startsWith(`${prefix}ban`)) {
        const username = data.msg.split(' ').slice(1).join(' ');
          if (username) {
            const player = client.players.find(player => player.name.toLowerCase() === username.toLowerCase());
              if (player) {
                  client.hostBan(player.id);
                  client.sendMessage(`I banned ${player.name}, If I have host permissons of course.`);
              } else {
                  client.sendMessage('Invalid username, try again.');
              }
          } else {
              client.sendMessage(`Please specify a valid username after ${prefix}ban`);
          }
          return;
      }
    },
};