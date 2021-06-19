module.exports = {
	name: 'saysimple',
	description: 'Envoi un message avec le bot dans le salon utilisé',
	args: true,
	usage: '<texte>',
	guildOnly: true,
	aliases: ['dire', 'parler'],
	cooldown: 0,
	permissions: 'MANAGE_MESSAGES',
	execute(message, args) {

		const messageToSend = args.join(' ');

		return message.channel.send(messageToSend);
	},
};