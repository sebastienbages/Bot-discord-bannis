const context = require('./context');

module.exports = {
	async getTicketMessageAsync() {
		try {
			const connection = await context.pool.awaitGetConnection();
			const results = await connection.awaitQuery('SELECT * FROM f1mtb0ah6rjbwawm.ticket WHERE (id = 1)');
			connection.release();
			return results;
		}
		catch (error) {
			console.error('Erreur récupération message des tickets : ', error);
		}
	},
	async saveTicketMessageAsync(messageId) {
		try {
			const connection = await context.pool.awaitGetConnection();
			await connection.awaitQuery('UPDATE f1mtb0ah6rjbwawm.ticket SET message_id = ? WHERE (id = 1)', [ messageId ]);
			connection.release();
		}
		catch (error) {
			console.error('Erreur récupération message des tickets : ', error);
		}
	},
	async saveNewTicketNumber(number) {
		try {
			const connection = await context.pool.awaitGetConnection();
			await connection.awaitQuery('UPDATE f1mtb0ah6rjbwawm.ticket SET last_number = ? WHERE (id = 1)', [ number ]);
			connection.release();
		}
		catch (error) {
			console.error('Erreur sauvegarde numéro du ticket : ', error);
		}
	},
};