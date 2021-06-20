const { color } = require('../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'guildMemberAdd',
	once: false,
	execute(member, client, connection) {
		console.log(`Détection de l'arrivée du joueur "${member.displayName}" sur le Discord`);

		connection.query('SELECT role_id FROM f1mtb0ah6rjbwawm.roles WHERE name = "start"', function(err, rows) {
			if (err) return console.error;

			const role = member.guild.roles.cache.find(r => r.id === rows[0].role_id);

			if (role) {
				member.roles.add(role);
				console.log(`Attribution du role "${role.name}" effectué`);
			}
			else {
				console.log('Echec de l\'attribution du role');
			}

			const welcomeChannel = member.guild.channels.cache.find(channel => channel.id === process.env.CHA_WELCOME);

			const welcomeEmbed = new MessageEmbed()
				.setColor(color)
				.setThumbnail(member.user.displayAvatarURL())
				.setTitle(`:inbox_tray: ${member.user.username} a rejoins notre communauté`)
				.setDescription('Nous te souhaitons la bienvenue !')
				.setFooter(`Désormais, nous sommes ${member.guild.memberCount} membres`);

			welcomeChannel.send(welcomeEmbed).catch(console.error);

			console.log('Traitement de l\'arrivée effectuée');
		});
	},
};