const { MessageEmbed } = require('discord.js');
const { color } = require('../../config.json');

module.exports = {
	name: 'removerole',
	description: 'Supprime un rôle pour un membre',
	args: true,
	usage: '<utilisateur> <role>',
	guildOnly: false,
	aliases: ['supprimer_role'],
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

		if (user.roles.cache.has(role.id)) {
			user.roles.remove(role.id);

			return message.channel.send('Rôle supprimé avec succès !')
				.then(msg => msg.delete({ timeout: 5000 }))
				.catch(console.error);
		}
		else {
			const dmMessageToUser = new MessageEmbed()
				.setColor(color)
				.setDescription('Cet utilisateur ne possède pas ce rôle');

			return message.channel.send(dmMessageToUser)
				.then(msg => msg.delete({ timeout: 5000 }))
				.catch(console.error);
		}

	},
};