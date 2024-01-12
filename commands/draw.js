module.exports = {
  name: "draw",
  description: "Draw command",
  execute(data, client, prefix) {
    if (data.msg.startsWith(`${prefix}draw`)) {
      const input = data.msg.split(" ");

      if (input.length < 2) {
        client.sendMessage("Please specify a valid input.");
        return;
      }

      const lowerCaseInput = input[1].toLowerCase();

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
            "This drawing doesn't exist. Check the drawings directory for all the drawings you can use.",
          );
        } else {
          client.sendMessage(
            "An error occurred while trying to pick/draw this drawing.",
          );
        }
      }
    }
  },
};