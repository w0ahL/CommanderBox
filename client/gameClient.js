const
  { Client } = require("skribbler"),
  fs = require('fs')


class GameClient extends Client {

  static clients = []
  
  constructor(options) {
    super(options);
    this.prefix = "!";
    this.commands = {};

    // Keep track of all the clients
    this.activeClient = new Proxy(this, {
      get: (target, prop) => {
        return target[prop];
      },

      set: (target, prop, value) => {
        target[prop] = value;
        GameClient.clients.push(target);
        return true;
      }
    })

    // Fix Max listeners because we like to add a lot.
    this.setMaxListeners(Infinity);
  }

  static generateCode(length = 8, includeCaps = true, includeNumbers = true) {
    // SpcFORK
    let charset = 'abcdefghijklmnopqrstuvwxyz';
    if (includeCaps) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';

    let code = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      code += charset[randomIndex];
    }
    return code;
  }

  updatePrefix(newPrefix) {
    let c = this.activeClient;
    if (
      typeof newPrefix === "string"
      && newPrefix.match(/^[!@#$%^&*_\-+=:.<>/?\\]+$/)
      && newPrefix.length > 0
    ) {
      c.prefix = newPrefix;
      c.sendMessage(`Prefix updated to: ${c.activeClient.prefix}`);
    } else {
      c.sendMessage('Error: Invalid prefix. It must be non-alphanumeric.');
    }
  }

  registerCommand(command) {
    let c = this.activeClient;
    c.commands[command.name] = command;
  }

  executeCommand(data) {
    let c = this.activeClient;
    const { msg } = data;
    if (!msg.startsWith(c.prefix) || data.player.name === c.options.name)
      return;

    const args = msg.slice(c.prefix.length).split(" ");
    const commandName = args.shift();
    const command = c.commands[commandName];

    if (commandName === "prefix") {
      c.updatePrefix(args[0]);
    } else if (command) {
      command.execute(data, c, c.prefix);
    }
  }

  registerEventHandlers() {
    let c = this.activeClient;
    c.on("connect", () => c.handleConnect());
    c.on("disconnect", (data) => c.handleDisconnect());

    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const command = require(`../commands/${file}`);
      c.on("text", (data) => c.handleText(data, command));
    }
  }

  handleConnect() {
    let c = this.activeClient;
    console.log(`Connected to ${c.lobbyId}\nCurrent Player Count: ${c.players.length}`);
    c.sendMessage(`Use ${c.prefix}help to see the list of my commands.`);
  }

  handleDisconnect(data) {
    let c = this.activeClient;
    console.log("Disconnected", data);
    setTimeout(() => {
      console.log('Rejoining in 3 seconds...');
      return c.reconnect();
    }, 3000);
  }

  reconnect() {
    return this.activeClient = new GameClient(this.activeClient.options);
  }

  handleText(data, command) {
    let c = this.activeClient;
    if (data.player.name === c.options.name) return;

    command.execute(data, c, c.prefix);
    if (data.msg.startsWith(`${c.prefix}prefix`)) {
      c.updatePrefix(data.msg);
    }
  }
}

module.exports = GameClient;