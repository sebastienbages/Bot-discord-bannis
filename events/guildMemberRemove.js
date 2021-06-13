const { channels, color } = require('../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'guildMemberRemove',
	once: false,
	execute(member) {
		console.log(`Détection du départ du joueur "${member.displayName}"`);

		const welcomechannel = member.guild.channels.cache.find(channel => channel.id === channels.welcome);

		const goodByeEmbed = new MessageEmbed()
			.setColor(color)
			.setThumbnail(member.user.displayAvatarURL())
			.setTitle(`:outbox_tray: ${member.user.username} a quitté notre communauté`)
			.setDescription('Au-revoir et à bientôt !')
			.setFooter(`Désormais, nous sommes ${member.guild.memberCount} membres`);

		welcomechannel.send(goodByeEmbed).catch(console.error);

		console.log('Traitement du départ effectué');
	},
};