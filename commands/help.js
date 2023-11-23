module.exports = {
    name: 'help',
    description: 'help command',
    execute(data, client, prefix) {
      if (data.msg.startsWith(`${prefix}help`)) {
        client.sendMessage('Grabbing the latest help information...');

        setTimeout(() => {
          client.sendMessage(`${prefix}ping - returns with pong`);
          client.sendMessage(`${prefix}pick - automatically picks a word when drawing; improving speeds & making people less mad.`);
        }, 3000)

        setTimeout(() => {
          client.sendMessage(`${prefix}draw - draws the discord this was made by.`);
          client.sendMessage(`${prefix}say - says what you want it to say`);
        }, 6000)

        setTimeout(() => {
          client.sendMessage(`${prefix}info - gives you basic information about the lobby.`);
          client.sendMessage(`${prefix}help - gives you information on how to use CommanderBox`);
        }, 9000)

        setTimeout(() => {
          client.sendMessage(`${prefix}votekick - vote kicks a user, you must include a username.`);
          client.sendMessage(`${prefix}prefix - changes the prefix.`);
        }, 12000)

        setTimeout(() => {
          client.sendMessage(`${prefix}userinfo - gives you basic user information, you must include a username.`);
        }, 16000)

        setTimeout(() => {
          client.sendMessage(`${prefix}leave - disconnects the bot & quits the program.`);
          client.sendMessage(`The current prefix is "${prefix}".`)
        }, 22000)

        return;
      }
    },
};