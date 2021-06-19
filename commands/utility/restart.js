const { WebhookClient } = require('discord.js');
const { webhooks } = require('../../config.json');

module.exports = {
	name: 'restart',
	description: 'Envoi un message d\'alerte de restart du serveur en utilisant le Webhook Gardien du serveur',
	args: false,
	usage: '[nom de la commande]',
	guildOnly: true,
	aliases: null,
	cooldown: 0,
	permissions: 'ADMINISTRATOR',
	execute() {

		const webhook = new WebhookClient(webhooks.serverGuard.id, webhooks.serverGuard.token);
		const msg = ':warning: @everyone Nous allons redémarrer le serveur, veuillez vous déconnecter :warning:';

		webhook.send(msg);
	},
};