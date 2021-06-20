const { MessageEmbed } = require('discord.js');
const { color } = require('../config.json');

module.exports = {
	name: 'messageToAdmin',
	execute(message, users, connection) {

		connection.query('SELECT discord_id FROM f1mtb0ah6rjbwawm.admins', function(err, rows) {
			if (err) return console.error;

			const admins = [];
			rows.map(r => admins.push(r.discord_id));

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
		});
	},
};