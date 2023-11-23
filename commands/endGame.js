module.exports = {
    name: 'endgame',
    description: 'end game command',
    execute(data, client, prefix) {
        if (data.msg.startsWith(`${prefix}endgame`)) {
            client.endGame();
            client.sendMessage('Ended Game, If I have host of course.');
            return;
        }
    },
};