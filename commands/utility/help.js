const { prefix } = require('../../config.json');

module.exports = {
	name: 'help',
	description: 'Liste de toutes les commandes ou détail d\'une commande spécifique',
	aliases: ['commandes', 'aide'],
	args: null,
	usage: '[nom de la commande]',
	guildOnly: false,
	cooldown: 0,
	permissions: 'ADMINISTRATOR',
	execute(message, args) {

		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			data.push('Liste des commandes :');
			data.push(commands.map(command => `\`${command.name}\``).join(', '));
			data.push(`\nTu peux envoyer \`${prefix}help <nom de la commande>\` pour obtenir plus d'informations sur une commande :wink:`);

			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('Je t\'ai envoyé la liste des commandes en message privé :wink:')
						.then(msg => msg.delete({ timeout: 5000 }));
				})
				.catch(error => {
					console.error(`Je n'ai pas pu envoyer un message privé à ${message.author.tag}.\n`, error);
					message.reply('Je n\'arrive pas à t\'envoyer un message privé ! As-tu cela bloqué cela ?');
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			if (message.channel.type === 'dm') {
				return message.reply('Cette commande n\'existe pas');
			}
			else {
				return message.reply('Cette commande n\'existe pas')
					.then(msg => msg.delete({ timeout: 5000 }));
			}
		}

		data.push(`**Nom:** \`${command.name}\``);

		if (command.aliases) data.push(`**Alias:** \`${command.aliases.join(', ')}\``);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** \`${prefix}${command.name} ${command.usage}\``);

		data.push(`**Cooldown:** ${command.cooldown} seconde(s)`);

		return message.author.send(data, { split: true });
	},
};