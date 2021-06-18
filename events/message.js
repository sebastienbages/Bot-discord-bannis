const { prefix } = require('../config.json');

module.exports = {
	name: 'message',
	once: false,
	execute(message, client) {
		if (!message.content.startsWith(prefix) || message.author.bot) return;

		const args = message.content.slice(prefix.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();

		if (!client.commands.has(commandName)) return;

		const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) return;

		if (command.permissions) {
			const authorPerms = message.channel.permissionsFor(message.author);
			if (!authorPerms || !authorPerms.has(command.permissions)) {
				return message.reply('You can not do this!');
			}
		}

		if (command.guildOnly && message.channel.type === 'dm') {
			return message.reply('je ne peux pas éxécuter cette commande dans un salon privé');
		}

		if (command.args && !args.length) {
			let reply = `Il vous manque l'argument, ${message.author} !`;

			if (command.usage) {
				reply += `\nCette commande s'utilise comme ceci : \`${prefix}${command.name} ${command.usage}\``;
			}

			return message.channel.send(reply)
				.then(msg => msg.delete({ timeout: 5000 }))
				.catch(console.error);
		}

		try {
			command.execute(message, args);
		}
		catch (error) {
			console.error(error);
			message.reply('Une erreur s\'est produite, veuillez contacter un administrateur');
		}
	},
};