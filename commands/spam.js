module.exports = {
    name: 'spam',
    description: 'Spam command',
    execute(data, client, prefix) {
      let i;
      let t;
      
      if (data.msg.startsWith(`${prefix}spam`)) {
        const msg = data.msg.split(' ')[1];
        const timer = data.msg.split(' ')[2];
        const cooldown = data.msg.split(' ')[3];

        if (typeof msg !== "string" && typeof timer !== "string" && typeof cooldown !== "string") {
          client.sendMessage(`Invaild spam fields. Make sure your fields is correct! (${prefix}spam <string> <num> <num>)`);
          
          return;
        }
        
        if(msg && timer && cooldown) {
          client.sendMessage(`Spam started; This will end in ${timer}s; ${prefix}leave to cancel & quit the program.`);
          
          i = setInterval(() => {
            client.sendMessage(msg);
          }, cooldown * 1000)

          t = setTimeout(() => {
            client.sendMessage('Spam ended');
            clearInterval(i);
          }, timer * 1000)
        } else {
          client.sendMessage(`You're missing fields! ex: ${prefix}spam <message> <time (in seconds)> <cooldown (in seconds)>`);
        }
        
        return;
      }
    },
};