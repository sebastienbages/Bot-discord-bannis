const { MessageEmbed } = require('discord.js');
const { color, channels } = require('../../config.json');

module.exports = {
	name: 'survey',
	description: 'Créé un sondage dans le salon des sondages',
	args: true,
	usage: '<question>',
	guildOnly: true,
	aliases: ['question', 'sondage'],
	cooldown: 0,
	permissions: 'ADMINISTRATOR',
	execute(message, args) {

		const sondageChannel = message.guild.channels.cache.find(channel => channel.id === channels.survey);

		if (!sondageChannel) {

			const error = new MessageEmbed()
				.setColor(color)
				.setDescription('Channel des sondages introuvable, veuillez le créer !');

			return message.reply(error)
				.then(msg => msg.delete({ timeout: 10000 }));
		}

		const messageToSend = args.join(' ');

		const messageEmbed = new MessageEmbed()
			.setTitle('SONDAGE')
			.attachFiles(['./images/point-d-interrogation.jpg'])
			.setThumbnail('attachment://point-d-interrogation.jpg')
			.setDescription(messageToSend)
			.setColor(color)
			.setFooter('Répondez en cliquant sur les réactions ci-dessous :');

		return sondageChannel.send(messageEmbed)
			.then(msg => {
				msg.react('✅').catch(console.error);
				msg.react('❌').catch(console.error);
			});
	},
};