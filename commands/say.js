module.exports = {
    name: 'say',
    description: 'Say command',
    execute(data, client, prefix) {
      if (data.msg.startsWith(`${prefix}say`)) {
        const msg = data.msg.split(' ')[1]; // Assuming that the username is the second word after the !say command
        if(msg) {
          client.sendMessage(msg);
        } else {
          client.sendMessage("There wasn't a message to say.");
        }

        return;
      }
    },
};