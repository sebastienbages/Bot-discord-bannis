const { MessageEmbed } = require('discord.js');
const { color } = require('../../config.json');

module.exports = {
	name: 'say',
	description: 'Envoi un message enrichi avec le bot',
	args: true,
	usage: '<text>',
	guildOnly: true,
	cooldown: 0,
	permissions: 'MANAGE_MESSAGES',
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