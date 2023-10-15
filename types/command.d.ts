import { ApplicationCommandOptionType } from 'discord-api-types/v10';
import { Client, Interaction } from 'discord.js';

export interface Option {
	name: string,
	description: string,
	required: boolean,
	type: ApplicationCommandOptionType.Boolean | ApplicationCommandOptionType.Channel | ApplicationCommandOptionType.Attachment | ApplicationCommandOptionType.Integer | ApplicationCommandOptionType.User | ApplicationCommandOptionType.Mentionable | ApplicationCommandOptionType.Role | ApplicationCommandOptionType.Number | ApplicationCommandOptionType.String | ApplicationCommandOptionType.Subcommand | ApplicationCommandOptionType.SubcommandGroup,
}

export type Command = {
	name: string,
	description: string,
	init: (interaction: Interaction, client: Client) => void,
	options: Option[],
}