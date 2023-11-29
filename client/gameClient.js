const
  { Client } = require("skribbler"),
  fs = require('fs')

function deshellCommand(prefix = '', commandName = '', str = '') {
  return str
    .replace(prefix+commandName, '')
    .trim();
}


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
    let caught = deshellCommand(this.prefix, 'prefix', newPrefix);
    if (
      typeof caught === "string"
      && caught.match(/[!@#$%^&*_\-+=:.<>/?\\]{1}/)
      && caught.length > 0
    ) {
      if (caught != this.prefix) {
        c.prefix = caught;
        c.sendMessage(`Prefix updated to: ${c.activeClient.prefix}`);
      }
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
    const events = [
      "connect",
      "disconnect",
      "message",
      "playerJoin",
      "playerLeave",
      "playerGuessed",
      "roundStart",
      "undo",
      "canDraw",
      "vote",
      "voteKick",
      "closeWord",
      "hintRevealed",
      "newOwner",
      "chooseWord",
      "clearCanvas",
      "draw",
      "packet"
    ].forEach(event => c.on(
      event,
      (...args) => {
        let handleName = `handle${event.charAt(0).toUpperCase() + event.slice(1)}`
        let resu = c?.[handleName]?.(...args);
        
        if (!c?.[handleName] && event != 'packet') {
          console.log(`[GameEvent] Event ${event} not handled.`);
        }
      }
    ));
    
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const command = require(`../commands/${file}`);
      c.on("text", (data) => c.handleText(data, command));
    }
  }

  handleConnect() {
    let c = this.activeClient;

    if (c.lobbyType === 0) {
      console.log("This doesn't support public lobbies just yet.\nCheck back soon for public lobby support.");

      return process.exit(0);
    }
    
    console.log(`Connected to ${c.lobbyId}\nCurrent Player Count: ${c.players.length}`);
    c.sendMessage(`Use ${c.prefix}help to see the list of my commands.`);
  }

  handleDisconnect(data) {
    console.log("Disconnected", data);
  }

  handleText(data, command) {
    let c = this.activeClient;

    if (data.player.name === c.options.name) return;
    
    if (!data.msg.startsWith(c.prefix)) return;

    command.execute(data, c, c.prefix);
    
    if (data.msg.startsWith(`${c.prefix}prefix`)) {
      c.updatePrefix(data.msg);
    }
  }
}

module.exports = GameClient;