import { Routes } from 'discord-api-types/v10';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { REST } from '@discordjs/rest';
import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { Command } from './types/command';

const client = new Client({
	intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages ],
	partials: [ Partials.Channel ],
});

let commands: Command[] = [];

dotenv.config({
	path: path.join(__dirname, '.env'),
});

const token =
	process.env.NODE_ENV === 'development'
		? process.env.TOKEN_DEV
		: process.env.TOKEN_PROD;

client.once('ready', async () => {
	console.log('Bot Ready!');
	
	let commandFiles = fs.readdirSync(path.join(__dirname, './commands'));
	
	for (const file of commandFiles) {
		const { init, description, options } = await import(`./commands/${ file }`);
		commands.push({
			name: file.split('.')[0],
			description,
			init,
			options,
		});
	}
	
	const eventFiles = fs
		.readdirSync(path.join(__dirname, './events'));
	
	let eventCount = 0;
	for (const file of eventFiles) {
		eventCount++;
		const { init, config } = await import(`./events/${ file }`);
		if (config.once == true) {
			client.once(config.name, (...args) => init(...args));
		} else {
			client.on(config.name, (...args) => init(...args));
		}
	}
	
	const rest = new REST({ version: '9' }).setToken(token);
	rest.put(Routes.applicationCommands(client.application.id), {
		body: commands,
	}).then(() => {
		console.log(`${ commands.length } commands registered!`);
		console.log(`${ eventCount } events registered!`);
	}).catch(console.error);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	
	const { commandName } = interaction;
	const selectedCommand = commands.find((command) => commandName === command.name);
	
	selectedCommand.init(interaction, client);
});

client.login(token).then(() => {
	console.log('Successfully logged in!');
});
