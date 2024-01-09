module.exports = {
    name: 'say',
    description: 'Say command',
    execute(data, client, prefix) {
      if (data.msg.startsWith(`${prefix}say`)) {
        const msg = data.msg.split(' ').slice(1).join(' '); // Join the array elements back together
        
        if (msg) {
          client.sendMessage(msg);
        } else {
          client.sendMessage("There wasn't a message to say.");
        }

        return;
      }
    },
};