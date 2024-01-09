module.exports = {
  name: "draw",
  description: "Draw command",
  execute(data, client, prefix) {
    if (data.msg.startsWith(`${prefix}draw`)) {
        const input = data.msg.split(" ")[1].toLowerCase();

      if (!input) {
        client.sendMessage("Please specify a valid input.");
        return;
      }

      try {
        const fileName = `../drawings/${input}.json`;

        const drawingData = require(`${fileName}`);

        let draw = [];

        for (const drawing of drawingData) {
          draw.push(drawing);

          if (draw.length < 7) continue;

          client.sendPacket(19, draw);

          draw = [];
        }

        return;
      } catch (error) {
        console.log(error);
        if (error.message.includes(`Cannot find module`)) {
          client.sendMessage(
            "An error occurred while processing this drawing.",
          );
        }
      }
    }
  },
};
