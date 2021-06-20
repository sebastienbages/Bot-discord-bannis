const axios = require('axios');
const { MessageEmbed, WebhookClient } = require('discord.js');
const { color } = require('../../config.json');

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

		const webhook = new WebhookClient(process.env.WH_VK_ID, process.env.WH_VK_TOKEN);
		const token = process.env.TOKEN_TOP_SERVEUR;

		const getUrlTopServeur = async () => {
			const response = await axios.get('https://api.top-serveurs.net/v1/servers/' + token);
			return response.data.server.slug;
		};

		const getNumberOfVotes = async () => {
			const response = await axios.get('https://api.top-serveurs.net/v1/servers/' + token + '/stats');
			const date = new Date().getMonth();
			const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december' ];
			const currentMonth = months[date];
			return response.data.stats.monthly[0][currentMonth + '_votes'];
		};

		const runVote = async () => {
			const serverSlug = await getUrlTopServeur();
			const numberOfVotes = await getNumberOfVotes();
			const topServeurUrl = 'https://top-serveurs.net/conan-exiles/vote/' + serverSlug;

			const messageEmbed = new MessageEmbed()
				.setColor(color)
				.setTitle('VOTEZ POUR LE SERVEUR')
				.setURL(topServeurUrl)
				.attachFiles(['./images/topServeur.png'])
				.setThumbnail('attachment://topServeur.png')
				.setDescription('N\'hésitez pas à donner un coup de pouce au serveur en votant. Merci pour votre participation :thumbsup:')
				.addField('LIEN TOP SERVEUR', topServeurUrl)
				.setFooter(`Pour l'instant, nous avons ${numberOfVotes} votes ce mois-ci`);

			return webhook.send(messageEmbed)
				.catch(console.error);
		};

		runVote();
	},
};