module.exports = {
    name: 'ping',
    description: 'Ping command',
    execute(data, client, prefix) {
        if (data.msg.startsWith(`${prefix}ping`)) {
            client.sendMessage('Pong');
        }
    },
};