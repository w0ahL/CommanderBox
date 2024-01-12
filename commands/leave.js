module.exports = {
    name: 'leave',
    description: 'Leave command',
    execute(data, client, prefix) {
      if (data.msg.startsWith(`${prefix}leave`)) {
          const randomCode = generateRandomCode();
        
          console.log(`Enter the following code to confirm leave: ${randomCode}\nIf this wasn't you, you can safely ignore this message & continue on using CommanderBox.`);

          client.sendMessage("Enter the code that is located in the console log to confirm disconnect.")

          client.on("text", (msgData) => {
            if (msgData.msg === String(randomCode) && data.player.id === data.player.id) {
                client.sendMessage("Leaving the lobby. Goodbye");
                console.log(`${data.player.name} has entered the code to make CommanderBox leave.`);
                process.exit(0);
            }
          });
        
          return;
      } 
    },
};

function generateRandomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_-=+';
  
    let result = '';
  
    for (let i = 0; i < 18; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    return result;
}