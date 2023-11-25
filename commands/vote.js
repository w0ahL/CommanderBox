module.exports = {
    name: 'vote',
    description: 'vote command',
    execute(data, client, prefix) {
      if (data.msg.startsWith(`${prefix}vote`)) {
        const vote = data.msg.split(' ')[1];
        let votingNum;

        let liked;
        let disliked;

        let likeMessage;
        let dislikeMessage;

        if(vote === "like") votingNum = 1;
        if(vote === "dislike") votingNum = 0;

        if(!vote) client.sendMessage(`You must pick "like" or "dislike" after using ${prefix}vote.`);

        if(votingNum === 1) liked = true;
        if(votingNum === 0) disliked = true;

        if(liked) likeMessage = "like";
        if(disliked) dislikeMessage = "dislike"

        if(vote && liked || disliked) {
            client.vote(votingNum);
            client.sendMessage(`I voted to ${dislikeMessage || likeMessage} this drawing.`);
        }

        liked = false;
        disliked = false;
        return;
      }
    },
};