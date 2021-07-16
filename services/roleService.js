const roleRepository = require('../dal/roleRepository');

module.exports = {
	name: 'roleService',
	async getRoleStartAsync() {
		try {
			const result = await roleRepository.getRoleStartIdAsync();
			return result[0].role_id;
		}
		catch (error) {
			console.error(error);
		}
	},
	async getRolesForTicket() {
		try {
			const results = await roleRepository.getRolesForTicket();
			const rolesId = [];
			results.map(result => rolesId.push(result.role_id));
			return rolesId;
		}
		catch (error) {
			console.error(error);
		}
	},
};