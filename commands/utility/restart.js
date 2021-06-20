const { WebhookClient } = require('discord.js');

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

		const webhook = new WebhookClient(process.env.WH_SK_ID, process.env.WH_SK_TOKEN);
		const msg = ':warning: @everyone Nous allons redémarrer le serveur, veuillez vous déconnecter :warning:';

		webhook.send(msg);
	},
};