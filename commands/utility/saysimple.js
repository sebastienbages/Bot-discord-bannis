module.exports = {
	name: 'say',
	description: 'Envoi un message avec le bot',
	args: true,
	usage: '<text>',
	guildOnly: true,
	cooldown: 0,
	permissions: 'MANAGE_MESSAGES',
	execute(message, args) {
		message.delete().catch(console.error);

		const messageToSend = args.join(' ');

		return message.channel.send(messageToSend)
			.catch(console.error);
	},
};