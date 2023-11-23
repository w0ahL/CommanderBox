module.exports = {
    name: 'draw',
    description: 'Draw command',
    execute(data, client, prefix) {
      if (data.msg.startsWith(`${prefix}draw`)) {
          const data = require("./drawings/discord.json");

          let draw = [];

          for (const drawing of data) {
            draw.push(drawing);

            if(draw.length < 7) continue;

            client.sendPacket(19, draw);

            draw = [];
          }

          return;
      }
    },
};