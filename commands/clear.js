module.exports = {
    name: 'clear',
    description: 'clear command',
    execute(data, client, prefix) {
        if (data.msg.startsWith(`${prefix}clear`)) {
            client.clearCanvas();
            client.sendMessage('I cleared the canva, If I am the current drawer of course.');
            return;
        }
    },
};