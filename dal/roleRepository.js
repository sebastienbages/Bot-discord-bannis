const context = require('./context');

module.exports = {
	async getRoleStartIdAsync() {
		try {
			const connection = await context.pool.awaitGetConnection();
			const results = await connection.awaitQuery('SELECT role_id FROM f1mtb0ah6rjbwawm.roles WHERE name = "start"');
			connection.release();
			return results;
		}
		catch (error) {
			console.error('Erreur récupération du role d\'un nouveau membre : ', error);
		}
	},
	async getRolesForTicket() {
		try {
			const connection = await context.pool.awaitGetConnection();
			const results = await connection.awaitQuery('SELECT role_id FROM f1mtb0ah6rjbwawm.roles WHERE ticket = 1');
			connection.release();
			return results;
		}
		catch (error) {
			console.error('Erreur récupération roles des tickets : ', error);
		}
	},
};