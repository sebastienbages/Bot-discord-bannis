module.exports = {
	name: 'saypriv',
	description: 'Envoi un message privé à l\'utilisateur spécifié',
	args: true,
	usage: '<membre> <message>',
	guildOnly: true,
	aliases: ['prive', 'chuchoter'],
	cooldown: 0,
	permissions: 'MANAGE_MESSAGES',
	execute(message, args) {

		const user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);

		if (!user) {
			return message.reply('ce membre n\'existe pas')
				.then(msg => msg.delete({ timeout: 10000 }));
		}

		const privateMessage = args[1];

		if (!privateMessage || privateMessage.length < 1) {
			return message.reply('ton message est vide')
				.then(msg => msg.delete({ timeout: 10000 }));
		}

		return user.send(privateMessage)
			.catch(error => {
				console.error(`Je n'ai pas pu envoyer un message privé à ${user.tag}.\n`, error);
				message.reply('Je n\'arrive pas à lui envoyer un message privé !');
			});
	},
};