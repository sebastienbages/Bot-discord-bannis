const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const { color } = require('../../config.json');

module.exports = {
	name: 'topserveur',
	description: 'Envoi le classement des votes de Top serveur du mois dernier ou courant',
	args: false,
	usage: '[last] (option facultative)',
	guildOnly: true,
	aliases: ['classement'],
	cooldown: 30,
	permissions: 'ADMINISTRATOR',
	execute(message, args) {
		let url, title;

		const option = args[0];
		const token = process.env.TOKEN_TOP_SERVEUR;

		if (option === 'last') {
			url = 'https://api.top-serveurs.net/v1/servers/' + token + '/players-ranking?type=lastMonth';
			title = 'Classement Top Serveur du mois dernier';
		}
		else {
			url = 'https://api.top-serveurs.net/v1/servers/' + token + '/players-ranking';
			title = 'Classement Top Serveur du mois en cours';
		}

		const messageEmbed = new MessageEmbed()
			.attachFiles(['./images/topServeur.png'])
			.setThumbnail('attachment://topServeur.png')
			.setTitle(title || 'Classement Top Serveur')
			.setColor(color)
			.setTimestamp();

		axios.get(url)
			.then(function(response) {

				const { players } = response.data;

				players.map(p => {
					if (p.playername === '') {
						messageEmbed.addField('Sans pseudo', `${p.votes.toString()}`, false);
					}
					else {
						messageEmbed.addField(`${p.playername}`, `${p.votes.toString()}`, false);
					}
				});

				if (messageEmbed.length > 6000) {
					message.author.send('Résulat trop volumineux');
					return console.log('Trop de caractères');
				}
				else {
					return message.author.send(messageEmbed);
				}
			})
			.catch(function(error) {
				console.log(error);
			});
	},
};