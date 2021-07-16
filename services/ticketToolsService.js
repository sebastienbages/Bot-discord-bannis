const ticketRepository = require('../dal/ticketRepository');

module.exports = {
	name: 'ticketToolsService',
	reactionCreateTicket: '🎫',
	reactionCloseTicket: '🔒',
	async getTicketMessagegAsync() {
		try {
			const data = await ticketRepository.getTicketMessageAsync();
			return data[0];
		}
		catch (error) {
			console.error(error);
		}
	},
	async fetchTicketMessageAsync(client) {
		try {
			const results = await ticketRepository.getTicketMessageAsync();
			const messageId = results[0].message_id;
			const channelId = results[0].channel_id;
			const guild = await client.guilds.fetch(process.env.GUILD_ID);
			const channel = guild.channels.cache.get(channelId);
			channel.messages.fetch(messageId);
		}
		catch (error) {
			console.error(error);
		}
	},
	async saveTicketMessageAsync(messageId) {
		try {
			await ticketRepository.saveTicketMessageAsync(messageId);
		}
		catch (error) {
			console.error(error);
		}
	},
	async saveNewTicketNumber(number) {
		try {
			await ticketRepository.saveNewTicketNumber(number);
		}
		catch (error) {
			console.error(error);
		}
	},
	getChannelName(lastNumber) {
		const lastNumberTicket = parseInt(lastNumber);
		const newTicketNumber = lastNumberTicket + 1;
		let channelName = [];
		channelName.unshift(newTicketNumber.toString());

		while (channelName.length < 4) {
			channelName.unshift('0');
		}

		channelName.unshift(' ');
		channelName.unshift('ticket');
		channelName = channelName.join('');
		return channelName;
	},
};