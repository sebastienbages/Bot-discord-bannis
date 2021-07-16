const context = require('./context');

module.exports = {
	async getAdminsDataAsync() {
		try {
			const connection = await context.pool.awaitGetConnection();
			const results = await connection.awaitQuery('SELECT * FROM f1mtb0ah6rjbwawm.admins');
			connection.release();
			return results;
		}
		catch (error) {
			console.error('Erreur récupération données des admins : ', error);
		}
	},
	async getAdminById(id) {
		try {
			const connection = await context.pool.awaitGetConnection();
			const results = await connection.awaitQuery('SELECT discord_id FROM f1mtb0ah6rjbwawm.admins WHERE (discord_id = ?)', [ id ]);
			connection.release();
			return results;
		}
		catch (error) {
			console.error('Erreur récupération de l\'admin : ', error);
		}
	},
	async createAdminAsync(discordId, name) {
		try {
			const connection = await context.pool.awaitGetConnection();
			await connection.awaitQuery('INSERT INTO f1mtb0ah6rjbwawm.admins (discord_id, name) VALUES (?, ?)', [ discordId, name ]);
			connection.release();
		}
		catch (error) {
			console.error('Erreur création de l\'admin : ', error);
		}
	},
	async removeAdminAsync(discordId) {
		try {
			const connection = await context.pool.awaitGetConnection();
			await connection.awaitQuery('DELETE FROM f1mtb0ah6rjbwawm.admins WHERE (discord_id = ?)', [ discordId ]);
			connection.release();
		}
		catch (error) {
			console.error('Erreur création de l\'admin : ', error);
		}
	},
};