module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log('Le bot est en ligne');
		client.user.setActivity('Conan Exiles');
	},
};