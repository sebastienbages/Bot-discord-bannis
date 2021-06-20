const { MessageEmbed } = require('discord.js');
const { color } = require('../../config.json');

module.exports = {
	name: 'clear',
	description: 'Efface le nombre de message dans le salon visé',
	args: true,
	usage: '<nombre de messages>',
	guildOnly: true,
	aliases: ['effacer', 'nettoyer'],
	cooldown: 5,
	permissions: 'MANAGE_MESSAGES',
	execute(message, args) {

		message.channel.bulkDelete(args[0], true)
			.then(() => {
				const messageEmbed = new MessageEmbed()
					.setColor(color)
					.setDescription(`J'ai supprimé ***${args[0]} message(s)***`);

				message.channel
					.send(messageEmbed)
					.then(msg => msg.delete({ timeout: 5000 }));
			})
			.catch(error => {
				message.reply('je ne peux pas effacer ce nombre de messages');
				console.error(error);
			});

		return;
	},
};