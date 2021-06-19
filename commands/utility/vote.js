const axios = require('axios');
const { MessageEmbed, WebhookClient } = require('discord.js');
const { webhooks, tokenTopServer, color } = require('../../config.json');

module.exports = {
	name: 'vote',
	description: 'Envoi un message d\'appel aux votes en utilisant le WebHook Gardien des votes',
	args: false,
	usage: '[nom de la commande]',
	guildOnly: true,
	aliases: null,
	cooldown: 0,
	permissions: 'ADMINISTRATOR',
	execute() {

		const webhook = new WebhookClient(webhooks.votesKeeper.id, webhooks.votesKeeper.token);
		const url = 'https://api.top-serveurs.net/v1/servers/' + tokenTopServer;

		axios.get(url)
			.then(function(response) {

				const { server } = response.data;
				const topServeurUrl = 'https://top-serveurs.net/conan-exiles/vote/' + server.slug;

				const messageEmbed = new MessageEmbed()
					.setColor(color)
					.setTitle('VOTEZ POUR LE SERVEUR')
					.setURL(topServeurUrl)
					.attachFiles(['./images/topServeur.png'])
					.setThumbnail('attachment://topServeur.png')
					.setDescription('N\'hésitez pas à donner un coup de pouce au serveur en votant. Merci pour votre participation :thumbsup:')
					.addField('LIEN TOP SERVEUR', topServeurUrl);

				return webhook.send(messageEmbed)
					.catch(console.error);
			})
			.catch(function(error) {
				console.log(error);
			});

	},
};