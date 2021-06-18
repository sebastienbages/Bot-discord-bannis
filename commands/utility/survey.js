const { MessageEmbed } = require('discord.js');
const { color } = require('../../config.json');

module.exports = {
	name: 'survey',
	description: 'Créé un sondage',
	args: true,
	usage: '<question>',
	guildOnly: true,
	aliases: ['question', 'sondage'],
	cooldown: 0,
	permissions: 'ADMINISTRATOR',
	execute(message, args) {
		message.delete().catch(console.error);

		const messageToSend = args.join(' ');

		const messageEmbed = new MessageEmbed()
			.setColor(color)
			.setDescription(messageToSend);

		return message.channel.send(messageEmbed)
			.catch(console.error);
	},
};