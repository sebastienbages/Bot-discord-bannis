const ticketToolsService = require('../../services/ticketToolsService');
const { MessageEmbed } = require('discord.js');
const { color } = require('../../config.json');

module.exports = {
	name: 'ticket',
	description: 'Outils de gestion des tickets',
	args: true,
	usage: '[config] / [msg] / [category] <category_id> / [channel] <channel_id>',
	guildOnly: true,
	aliases: null,
	cooldown: 0,
	permissions: 'ADMINISTRATOR',
	async execute(message, args) {

		const option = args[0].toLowerCase();
		const ticketMessage = await ticketToolsService.getTicketMessagegAsync();
		const categoryId = ticketMessage.category_id;
		const channelId = ticketMessage.channel_id;
		const ticketNumber = ticketMessage.last_number;

		const category = message.guild.channels.cache.find(c => c.id === categoryId);
		const channel = message.guild.channels.cache.find(c => c.id === channelId);

		if (option === 'config') {

			const messageEmbed = new MessageEmbed()
				.setColor(color)
				.setTitle('PARAMETRES DES TICKETS')
				.setTimestamp();

			if (category) {
				messageEmbed.addField('NOM DE LA CATEGORIE', `<#${category.id}>`);
			}
			else {
				messageEmbed.addField('NOM DE LA CATEGORIE', 'Catégorie non enregistrée');
			}

			if (channel) {
				messageEmbed.addField('CHANNEL DES TICKET', `<#${channel.id}>`);
			}
			else {
				messageEmbed.addField('SALON CREATION DES TICKET', 'Salon non enregistré');
			}

			messageEmbed.addField('NOMBRE DE TICKET(S)', ticketNumber);

			message.reply(messageEmbed)
				.catch(console.error);
		}
		else if (option === 'msg') {

			const messageEmbed = new MessageEmbed()
				.setColor(color)
				.setTitle('Creation d\'un ticket')
				.setDescription('Bienvenue dans le gestionnaire de ticket des Bannis. \n Pour créer un ticket, clique sur la réaction :ticket:');

			if (channel) {
				channel.send(messageEmbed)
					.then(msg => {
						msg.react(ticketToolsService.reactionCreateTicket).catch(console.error);
						ticketToolsService.saveTicketMessageAsync(msg.id);
					})
					.catch(console.error);

			}
			else {
				message.reply('Salon des tickets introuvable')
					.then(msg => msg.delete({ timeout: 5000 }))
					.catch(console.error);
			}
		}
	},
};