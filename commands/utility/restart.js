const { WebhookClient } = require('discord.js');
const { serverGuard } = require('../../config.json');

module.exports = {
	name: 'restart',
	description: 'Envoi un message d\'alerte de restart du serveur',
	args: false,
	usage: '',
	guildOnly: false,
	aliases: [],
	cooldown: 0,
	permissions: 'ADMINISTRATOR',
	execute(message) {
		message.delete();

		const webhook = new WebhookClient(serverGuard.id, serverGuard.token);
		const msg = ':warning: @everyone Nous allons redémarrer le serveur, veuillez vous déconnecter :warning:';

		return webhook.send(msg).catch(console.error);
	},
};