const context = require('./context');

module.exports = {
	async saveMessageVoteAsync(id) {
		try {
			const connection = await context.pool.awaitGetConnection();
			await connection.awaitQuery('UPDATE f1mtb0ah6rjbwawm.messages SET message_id = ? WHERE (name = "vote")', [ id ]);
			connection.release();
		}
		catch (error) {
			console.error('Erreur sauvegarde msg de vote : ', error);
		}
	},
	async getLastMessageVoteAsync() {
		try {
			const connection = await context.pool.awaitGetConnection();
			const results = await connection.awaitQuery('SELECT message_id as message, channel_id as channel FROM f1mtb0ah6rjbwawm.messages WHERE name = "vote"');
			connection.release();
			return results;
		}
		catch (error) {
			console.error('Erreur récupération msg de vote : ', error);
		}
	},
};