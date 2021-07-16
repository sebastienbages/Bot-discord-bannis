const axios = require('axios');
const token = process.env.TOKEN_TOP_SERVEUR;
const url = 'https://api.top-serveurs.net/v1/servers/' + token;

// OK
module.exports = {
	name: 'topServerService',
	async getSlugTopServer() {
		try {
			const response = await axios.get(url);
			return response.data.server.slug;
		}
		catch (error) {
			console.error('Erreur récupération slug de Top Serveur : ', error);
		}
	},
	async getNumberOfVotes() {
		try {
			const response = await axios.get(url + '/stats');
			const date = new Date().getMonth();
			const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december' ];
			const currentMonth = months[date];
			return response.data.stats.monthly[0][currentMonth + '_votes'];
		}
		catch (error) {
			console.error('Erreur récupération nbr de votes Top Serveur : ', error);
		}
	},
	async getPlayersRankingAsync(lastMonth = false) {
		try {
			let response;

			if (lastMonth) {
				response = await axios.get(url + '/players-ranking?type=lastMonth');
			}
			else {
				response = await axios.get(url + '/players-ranking');
			}

			const { players } = response.data;
			return players;
		}
		catch (error) {
			console.error('Erreur récupération classement Top Serveur : ', error);
		}
	},
};