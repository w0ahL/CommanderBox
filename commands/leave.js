module.exports = {
    name: 'leave',
    description: 'Leave command',
    execute(data, client, prefix) {
      if (data.msg.startsWith(`${prefix}leave`)) {
          client.sendMessage('Disconnected by Command Execution.');

          setTimeout(() => {
              client.disconnect();
              process.exit(0);
          }, 3)

          return;
      } 
    },
};