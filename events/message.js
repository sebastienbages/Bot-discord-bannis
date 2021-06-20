const { Collection } = require('discord.js');
const { prefix, guildId, webhooks } = require('../config.json');
const { votesKeeper } = webhooks;

module.exports = {
	name: 'message',
	once: false,
	execute(message, client) {

		if (message.author.bot) return;

		if (message.author.id === votesKeeper.id) {
			return message.delete({ timeout: 4 * 60 * 60 * 1000 });
		}

		if (message.channel.type === 'dm' && !message.content.startsWith(prefix)) {
			return client.services.get('messageToAdmin').execute(message, client.users);
		}

		if (!message.content.startsWith(prefix)) return;

		const args = message.content.slice(prefix.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();

		const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) return;

		if (message.channel.type != 'dm') {
			message.delete();
		}

		if (command.permissions) {

			const guild = client.guilds.cache.find(g => g.id === process.env.GUILD_ID || guildId);
			const authorPerms = guild.members.cache.find(user => user.id === message.author.id);

			if (!authorPerms || !authorPerms.hasPermission(command.permissions)) {

				if (message.channel.type != 'dm') {
					return message.reply('Vous n\'avez pas la permission d\'utiliser cette commande')
						.then(msg => msg.delete({ timeout: 5000 }));
				}
				else {
					return message.reply('Vous n\'avez pas la permission d\'utiliser cette commande');
				}
			}
		}

		if (command.guildOnly && message.channel.type === 'dm') {
			return message.reply('Je ne peux pas éxécuter cette commande dans un salon privé');
		}

		if (command.args && !args.length) {
			let reply = `Il vous manque l'argument, ${message.author} !`;

			if (command.usage) {
				reply += `\nCette commande s'utilise comme ceci : \`${prefix}${command.name} ${command.usage}\``;
			}

			return message.channel.send(reply)
				.then(msg => msg.delete({ timeout: 10000 }));
		}

		const { cooldowns } = client;

		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;

		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;

				if (message.channel.type === 'dm') {
					return message.reply(`Tu dois attendre ${timeLeft.toFixed(1)} seconde(s) avant de pouvoir réutiliser la commande \`${command.name}\``);
				}
				else {
					return message.reply(`Tu dois attendre ${timeLeft.toFixed(1)} seconde(s) avant de pouvoir réutiliser la commande \`${command.name}\``)
						.then(msg => msg.delete({ timeout: 5000 }));
				}
			}
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

		try {
			command.execute(message, args);
		}
		catch (error) {
			console.error(error);
			message.reply('Une erreur s\'est produite, veuillez contacter un administrateur');
		}
	},
};