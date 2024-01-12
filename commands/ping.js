module.exports = {
    name: 'ping',
    description: 'Ping command',
    execute(data, client, prefix) {
        if (data.msg.startsWith(`${prefix}ping`)) {
            const startTime = Date.now();

            client.sendMessage('Getting Latency...');

            const listenerCallback = (msgData) => {
                if (msgData.msg === 'Getting Latency...' && msgData.player.id === client.userId) {
                    const endTime = Date.now();
                    const ping = endTime - startTime;

                    client.sendMessage(`Latency: ${ping}ms`);

                    client.off('text', listenerCallback); // Remove the listener
                }
            };

            client.on('text', listenerCallback); // Add the listener
        }
    },
};