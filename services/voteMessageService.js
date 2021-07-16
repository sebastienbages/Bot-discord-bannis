const { getLastMessageVoteAsync, saveMessageVoteAsync } = require('../dal/voteRepository');

module.exports = {
	name: 'voteMessageService',
	async saveMessageAsync(message) {
		try {
			const data = await getLastMessageVoteAsync();

			if(data.length !== 0) {
				const lastMessage = data[0];
				const channel = message.guild.channels.cache.find(c => c.id === lastMessage.channel);

				if (channel) {
					channel.messages.fetch(lastMessage.message)
						.then(msg => msg.delete())
						.catch(console.error);
				}
			}

			saveMessageVoteAsync(message.id);
		}
		catch (error) {
			console.error(error);
		}
	},
};