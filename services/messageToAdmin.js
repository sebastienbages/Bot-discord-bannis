const { MessageEmbed } = require('discord.js');
const { color, admins } = require('../config.json');

module.exports = {
	name: 'messageToAdmin',
	execute(message, users) {

		const messageEmbed = new MessageEmbed()
			.setColor(color)
			.setTitle('MESSAGE PRIVE RECU')
			.setThumbnail(message.author.displayAvatarURL())
			.addField('AUTEUR', message.author.username)
			.addField('MESSAGE', message.content)
			.setTimestamp();

		admins.map(a => {
			const admin = users.cache.find(user => user.id === a);
			if (admin) {
				admin.send(messageEmbed);
			}
		});
	},
};