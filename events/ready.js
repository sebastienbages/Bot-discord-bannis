module.exports = {
	name: 'ready',
	once: true,
	execute(client) {

		console.log('Le bot est en ligne');
		client.user.setActivity('Conan Exiles');

		try {
			const voteCommand = client.commands.get('vote');
			setInterval(() => { voteCommand.execute(); }, 4 * 60 * 60 * 1000);
		}
		catch {
			console.error;
		}
	},
};