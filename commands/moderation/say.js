const { MessageEmbed } = require('discord.js');
const { color } = require('../../config.json');

module.exports = {
	name: 'say',
	description: 'Envoi un message enrichi avec le bot dans le salon utilisé',
	args: true,
	usage: '<texte>',
	guildOnly: true,
	aliases: ['embed'],
	cooldown: 0,
	permissions: 'MANAGE_MESSAGES',
	execute(message, args) {

		const messageToSend = args.join(' ');

		const messageEmbed = new MessageEmbed()
			.setColor(color)
			.setDescription(messageToSend);

		return message.channel.send(messageEmbed);
	},
};