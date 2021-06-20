// const { MessageEmbed } = require('discord.js');
// const { color } = require('../../config.json');

module.exports = {
	name: 'admin',
	description: 'Outils de gestion des admins du serveur',
	args: true,
	usage: '[list] / [add] <membre> / [remove] <membre>',
	guildOnly: true,
	aliases: null,
	cooldown: 0,
	permissions: 'ADMINISTRATOR',
	execute(message, args, connection) {

		const command = args[0].toLowerCase();

		if (command === 'list') {

			connection.query('SELECT name FROM f1mtb0ah6rjbwawm.admins', function(err, rows) {
				if (err) return console.error;

				const admins = [];
				rows.map(r => admins.push(r.name));

				const data = [];

				data.push('LISTE DES ADMINISTRATEURS :');
				data.push(`\`${admins.join(', ')}\``);

				message.channel.send(data);
			});
		}
		else if (command === 'add') {

			const user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[1]);

			if (!user) {
				return message.reply('ce membre n\'existe pas')
					.then(msg => msg.delete({ timeout: 5000 }));
			}

			connection.query('SELECT discord_id FROM f1mtb0ah6rjbwawm.admins WHERE (discord_id = ?)', [ user.user.id ], function(err, rows) {
				if (err) return console.error;

				if (rows.length > 0) {
					message.reply('ce membre est déjà enregistré')
						.then(msg => msg.delete({ timeout: 5000 }));
				}
				else {
					connection.query('INSERT INTO f1mtb0ah6rjbwawm.admins (discord_id, name) VALUES (?, ?)', [ user.user.id, user.user.username ], function(err) {
						if (err) return console.error;

						message.reply('enregistrement effectué avec succès')
							.then(msg => msg.delete({ timeout: 5000 }));
					});
				}
			});
		}
		else if (command === 'remove') {

			const user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[1]);

			if (!user) {
				return message.reply('ce membre n\'existe pas')
					.then(msg => msg.delete({ timeout: 5000 }));
			}

			connection.query('SELECT discord_id FROM f1mtb0ah6rjbwawm.admins WHERE (discord_id = ?)', [ user.user.id ], function(err, rows) {
				if (err) return console.error;

				if (rows.length === 0) {
					message.reply('ce membre n\'est pas enregistré')
						.then(msg => msg.delete({ timeout: 5000 }));
				}
				else {
					connection.query('DELETE FROM f1mtb0ah6rjbwawm.admins WHERE (discord_id = ?)', [ user.user.id ], function(err) {
						if (err) return console.error;

						message.reply('administrateur supprimé avec succès')
							.then(msg => msg.delete({ timeout: 5000 }));
					});
				}
			});
		}
	},
};