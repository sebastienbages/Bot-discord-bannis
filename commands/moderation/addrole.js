const { MessageEmbed } = require('discord.js');
const { color } = require('../../config.json');

module.exports = {
	name: 'addrole',
	description: 'Envoi un message enrichi avec le bot',
	args: true,
	usage: '<user> <role>',
	guildOnly: false,
	cooldown: 0,
	permissions: 'MANAGE_ROLES',
	execute(message, args) {
		const user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);

		if (!user) {
			message.delete();

			const userErrorMessage = MessageEmbed()
				.setColor(color)
				.setDescription('Le membre n\'existe pas');

			return message.channel
				.send(userErrorMessage)
				.then(msg => msg.delete({ timeout: 10000 }))
				.catch(console.error);
		}

		const roleAssign = args[1];
		const role = message.guild.roles.cache.find(r => r.name === roleAssign);

		if (!role) {
			message.delete();

			const roleErrorMessage = new MessageEmbed()
				.setColor(color)
				.setDescription('Ce rôle n\'existe pas !');

			return message.channel
				.send(roleErrorMessage)
				.then(msg => msg.delete({ timeout: 10000 }))
				.catch(console.error);
		}

		message.delete();

		user.roles.add(role.id);

		const dmMessageToUser = new MessageEmbed()
			.setColor(color)
			.setDescription(`Bravo ! Tu as reçu le rôle de **${role.name}** !`);

		return user.send(dmMessageToUser).catch(console.error);
	},
};