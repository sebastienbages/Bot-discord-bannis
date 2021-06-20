const { MessageEmbed } = require('discord.js');
const { color } = require('../../config.json');

module.exports = {
	name: 'addrole',
	description: 'Ajoute un rôle pour un membre',
	args: true,
	usage: '<utilisateur> <role>',
	guildOnly: true,
	aliases: ['ajouter_role'],
	cooldown: 0,
	permissions: 'MANAGE_ROLES',
	execute(message, args) {

		const user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);

		if (!user) {
			return message.reply('ce membre n\'existe pas')
				.then(msg => msg.delete({ timeout: 10000 }));
		}

		const roleAssign = args[1];
		const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === roleAssign.toLowerCase());

		if (!role) {
			return message.reply('ce rôle n\'existe pas !')
				.then(msg => msg.delete({ timeout: 10000 }));
		}

		if (user.roles.cache.has(role.id)) {
			return message.reply('ce membre possède déjà ce role !')
				.then(msg => msg.delete({ timeout: 10000 }));
		}

		user.roles.add(role.id);

		const dmMessageToUser = new MessageEmbed()
			.setColor(color)
			.setDescription(`Bravo ! Tu as reçu le rôle de **${role.name}** !`);

		user.send(dmMessageToUser).catch(console.error);

		return message.reply('rôle attribué avec succès !')
			.then(msg => msg.delete({ timeout: 5000 }));
	},
};