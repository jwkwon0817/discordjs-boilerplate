# Discord.js v14 BoilerPlate

---

### Features

- ES6
- TypeScript
- Easy to use

# Tutorial

---

### Installation

- Clone this repository
	- `git clone https://github.com/jwkwon0817/discordjs-boilerplate.git`
- Install dependencies
	- `npm install` or `yarn install`
- Create `.env` file
	- `cp example.env .env`
	- Fill out the `.env` file
	- `TOKEN_PROD` is your production bot token
	- `TOKEN_DEV` is your development bot token
- Run the bot
	- `npm run start` or `yarn start` for production
	- `npm run dev` or `yarn dev` for development
	- `npm run dev:watch` or `yarn dev:watch` for development with nodemon
- Enjoy!

### Usage

- `src/commands` is where you put your commands
- `src/events` is where you put your events

### Example

- `src/commands/ping.ts`

```ts
const description = 'Pong!!'

const init = (interaction, client) => {
	interaction.reply('Pong!')
}

export { init, description };
```

- `src/events/ready.ts`

```ts
const config = {
	name: 'messageCreate',
	once: false,
};

const init = (interaction) => {
	if (interaction.author.bot) return;
	
	interaction.reply('Hello World!');
};

export { init, config };
```