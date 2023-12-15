# CommanderBox

CommanderBox is a skribbl.io bot that provides various functionalities for lobbies.

## Setting up the Bot

1. Clone the repository to your local machine.

2. Install the necessary dependencies by running the following command:

```shell 
npm i
```

3. Set up the .env file with the required environment variables, including the webhook URL and a prefix. An example .env file:

```
WEBHOOK_URL=DISCORD WEBHOOK GOES HERE
PREFIX=!
```

4. Run the bot using the following command:

```shell
node index.js
```


## Hosting the Bot

You can host the bot on any server that supports Node.js applications. Some popular hosting options include Heroku, AWS, Replit, and DigitalOcean. Ensure that the necessary environment variables are properly configured in your hosting environment.

Feel free to customize the bot's functionality and commands to suit your specific requirements.


## Chat Commands

The CommanderBox provides a set of commands that can be utilized within the skribbl.io game chat. These commands enhance the skribbl.io experience and facilitate game management, interaction, and moderation.

- `startgame` - Start a new game (Host)
- `vote <option>` - Initiate a vote with the specified option
- `userInfo <username>` - Retrieve information about a specific player
- `spam <message> <time> <cooldown>` - Initiate a spam with a specified message, duration, and cooldown time
- `say <message>` - Send a message in the game chat
- `ping` - Check if the bot's replying back.
- `guess` - Automatically guesses the current word for the round.
- `pick` - Automatically choose a word for the game (Drawer)
- `relay` - shows skribbl.io chat inside of discord (Must provide a webhook url in .env file)
- `leave` - Disconnect from the game & host.
- `kick <username>` - Kick a player from the game (Host)
- `info` - Retrieve information about the game and the bot
- `help` - Display a list of available commands and their usage
- `endGame` - End the current game (Host)
- `draw` - Initiate a drawing event within the game to advertise the discord server (Drawer)
- `record` - Saves the current drawing into a JSON file onto the drawings directory with a specified name.
- `clear` - Clear the game canvas (Drawer)
- `ban <username>` - Ban a player from the game (Host)

These commands empower players to manage and control various aspects of the skribbl.io game environment, fostering an enhanced and interactive gaming experience.

Feel free to explore and customize these commands to amplify the experience within skribbl.io.
