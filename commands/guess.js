const fs = require('fs');

module.exports = {
    name: 'guess',
    description: 'Guess command',
    execute(data, client, prefix) {
      if (data.msg.startsWith(`${prefix}guess`)) {
        let state;
        let guessed;
        let testedWords = [];
        let wordLengths = [];
        let hints = [];
        let lastMsgSent;
        let stop;
        let botGuessed;

        const words = shuffle(fs.readFileSync("./client/data/words.txt", "utf8").split(/\r?\n/));

        state = undefined;
        guessed = undefined;
        testedWords = [];
        wordLengths = [];
        hints = [];
        lastMsgSent = undefined;
        botGuessed = null;

        client.on("text", (data) => {
          const { player, msg } = data;

          if (player.id === client.userId) lastMsgSent = Date.now();

          if (msg.startsWith("The word is ") && !guessed) {
            const word = msg.replace("The word is ", "").replace(/"/g, "");
            if (player.guessed) {
              client.sendMessage(word);
            } else if (state === 3) {
              setTimeout(() => {
                client.sendMessage(word);
              }, 500);
            }
          }

          const words = msg.split(" ");

          if (words.length !== wordLengths.length) return;

          testedWords.push(msg.msg);
        });

        client.on("packet", (data) => {
          switch (data.id) {
            case 10: {
              state = data.data.state.id;

              if (state !== 4) break;

              guessed = false;
              testedWords = [];
              hints = data.data.state.data?.hints ?? [];
              wordLengths = data.data.state.data?.word ?? [];

              autoGuesser(client);
              break;
            }
            case 11: {
              const packet = data.data;

              state = packet.id;
              if (state !== 4 || client.currentDrawer?.id === client.userId) break;

              guessed = false;
              testedWords = [];
              hints = [];
              wordLengths = packet.data.word;

              autoGuesser(client);
              break;
            }
          }
        });

        client.on("playerGuessed", (data) => {
          if (data.player.id === client.userId) {
            guessed = true;
            botGuessed = true;
          }
        });

        client.on("hintRevealed", (hint) => {
          hints = hints.concat(hint);
        });

        function autoGuesser(client) {
          if(botGuessed === true) {
            return;
          }
          
          check(client);

          let i = setInterval(() => {
            if(botGuessed === true) {
              clearInterval(i);
              return;
            }
            
            check(client, i);
          }, 910);
        }
        
        function check(client, i) {
          if (guessed || state !== 4 || !client.connected) return clearInterval(i);

          for (const pWord of words) {
            if (testedWords.includes(pWord)) continue;

            const words = pWord.split(/[ -]/);

            if (words.length !== wordLengths.length) {
              testedWords.push(pWord);
              continue;
            }

            let counter = 0;
            stop = false;
            
            for (const length of wordLengths) {
              if (words[counter].length !== length) {
                stop = true;
                break;
              }

              // check hints
              for (const hint of hints) {
                if (pWord[hint[0]] === hint[1]) continue;

                stop = true;
                break;
              }

              counter++;
            }

            testedWords.push(pWord);

            if (!stop) {
              client.sendMessage(pWord);
              break;
            }
          }
        }

        function shuffle(array) {
          let currentIndex = array.length, randomIndex;

          while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
          }

          return array;
        }
        
      client.sendMessage("From now on, I will be trying to automatically guess the current word for that current round.");

      autoGuesser(client)
        
      return;
    } 
  },
};