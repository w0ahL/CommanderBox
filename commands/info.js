module.exports = {
    name: 'info',
    description: 'Info command',
    execute(data, client, prefix) {
      if (data.msg.startsWith(`${prefix}info`)) {
        let isPrivate;
        
        client.sendMessage('Grabbing the latest information...');

        if (client.lobbyType === 0) {
          isPrivate = false;
        } else if (client.lobbyType === 1) {
          isPrivate = true;
        }

        setTimeout(() => {
          client.sendMessage(`Online Players: ${client.players.length ?? "N/A"}`);
          client.sendMessage(`Current Drawer: ${client.currentDrawer?.name ?? "N/A"}`);
        }, 3000)

        setTimeout(() => {
          client.sendMessage(`Lobby Code: ${client.lobbyId}`);
          client.sendMessage(`Is Private: ${isPrivate}`);
        }, 6000)

        setTimeout(() => {
          client.sendMessage('socket-io-client version: v4.7.2');
          client.sendMessage(`Version: v1.0.4`);
        }, 9000)

        return;
      }
    },
};