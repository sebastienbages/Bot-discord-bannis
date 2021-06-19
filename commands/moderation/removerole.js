module.exports = {
	name: 'removerole',
	description: 'Supprime un rôle pour un membre',
	args: true,
	usage: '<utilisateur> <role>',
	guildOnly: true,
	aliases: ['supprimer_role'],
	cooldown: 0,
	permissions: 'MANAGE_ROLES',
	execute(message, args) {

		const user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);

		if (!user) {
			return message.reply('le membre n\'existe pas')
				.then(msg => msg.delete({ timeout: 10000 }));
		}

		const roleAssign = args[1];
		const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === roleAssign.toLowerCase());

		if (!role) {
			return message.reply('ce rôle n\'existe pas !')
				.then(msg => msg.delete({ timeout: 10000 }));
		}

		if (user.roles.cache.has(role.id)) {

			user.roles.remove(role.id);

			return message.reply('rôle supprimé avec succès !')
				.then(msg => msg.delete({ timeout: 5000 }));
		}
		else {
			return message.reply('cet utilisateur ne possède pas ce rôle')
				.then(msg => msg.delete({ timeout: 5000 }));
		}

	},
};