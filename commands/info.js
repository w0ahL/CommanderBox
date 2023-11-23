module.exports = {
    name: 'info',
    description: 'Info command',
    execute(data, client, prefix) {
      if (data.msg.startsWith(`${prefix}info`)) {
        client.sendMessage('Grabbing the latest information...');

        setTimeout(() => {
          client.sendMessage(`Online Players: ${client.players.length ?? "N/A"}`);
          client.sendMessage(`Current Drawer: ${client.currentDrawer?.name ?? "N/A"}`);
        }, 3000)

        setTimeout(() => {
          client.sendMessage(`Lobby Code: ${client.lobbyId}`);
          client.sendMessage(`Version: v1.0.2`);
        }, 6000)

        setTimeout(() => {
          client.sendMessage('socket-io-client version: v4.7.2');
        }, 9000)

        return;
      }
    },
};