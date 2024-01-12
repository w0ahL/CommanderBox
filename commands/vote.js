module.exports = {
  name: "vote",
  description: "vote command",
  execute(data, client, prefix) {
    if (data.msg.startsWith(`${prefix}vote `)) {
      const input = data.msg.split(" ")[1];

      if (!input) {
        client.sendMessage(
          `You must pick "like" or "dislike" after using ${prefix}vote.`,
        );
        return;
      }

      const vote = input.toLowerCase();

      if (vote === "like" || vote === "dislike") {
        const votingNum = vote === "like" ? 1 : 0;
        client.vote(votingNum);
        client.sendMessage(`I voted to ${vote} this drawing.`);
      } else {
        client.sendMessage(
          'Invalid vote. Please pick "like" or "dislike" after using the vote command.',
        );
      }
    }
  },
};