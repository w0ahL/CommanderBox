module.exports = {
    name: 'startgame',
    description: 'start game command',
    execute(data, client, prefix) {
        if (data.msg.startsWith(`${prefix}startgame`)) {
            client.startGame();
            client.sendMessage('Started Game, If I have host of course.');
            return;
        }
    },
};