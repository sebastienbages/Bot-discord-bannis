const { MessageEmbed } = require('discord.js');
const { color } = require('../config.json');
const adminRepository = require('../dal/adminRepository');

module.exports = {
	name: 'adminMessageService',
	async transfertPrivateMessage(message, client) {
		try {
			const admins = await this.getAdminsIdsAsync();

			const messageEmbed = new MessageEmbed()
				.setColor(color)
				.setTitle('MESSAGE PRIVE RECU')
				.setThumbnail(message.author.displayAvatarURL())
				.addField('AUTEUR', message.author.username)
				.addField('MESSAGE', message.content)
				.setTimestamp();

			admins.map(id => {
				const admin = client.users.cache.find(user => user.id === id);
				if (admin) {
					admin.send(messageEmbed);
				}
			});
		}
		catch (error) {
			console.error(error);
		}
	},
	async getAdminsIdsAsync() {
		try {
			const results = await adminRepository.getAdminsDataAsync();
			const admins = [];
			results.map(result => admins.push(result.discord_id));
			return admins;
		}
		catch (error) {
			console.error(error);
		}
	},
	async getAdminsNamesAsync() {
		try {
			const results = await adminRepository.getAdminsDataAsync();
			const admins = [];
			results.map(result => admins.push(result.name));
			return admins;
		}
		catch (error) {
			console.error(error);
		}
	},
	async adminIsExistAsync(id) {
		try {
			const results = await adminRepository.getAdminById(id);

			if (results.length === 0) {
				return false;
			}
			else {
				return true;
			}
		}
		catch (error) {
			console.error(error);
		}
	},
	async createAdminAsync(discordId, name) {
		try {
			adminRepository.createAdminAsync(discordId, name);
		}
		catch (error) {
			console.error(error);
		}
	},
	async removeAdminAsync(discordId) {
		try {
			adminRepository.removeAdminAsync(discordId);
		}
		catch (error) {
			console.error(error);
		}
	},
};