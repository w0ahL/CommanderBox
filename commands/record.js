module.exports = {
  name: "record",
  description: "record command",
  execute(data, client, prefix) {
    const fs = require("fs");
    if (data.msg.startsWith(`${prefix}record`)) {
      const input = data.msg.split(" ")[1].toLowerCase();

      if (!input) {
        client.sendMessage("Please specify a valid input.");
        return;
      }

      const fileName = `${input}.json`;

      fs.writeFileSync(`./drawings/${fileName}`, JSON.stringify(client.canvas));

      client.sendMessage(
        `Drawing "${input}" has been saved! You can use ${prefix}draw ${input} to load it!`,
      );
      return;
    }
  },
};
