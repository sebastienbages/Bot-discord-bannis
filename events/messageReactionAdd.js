const ticketToolsService = require('../services/ticketToolsService');
const roleService = require('../services/roleService');
const { MessageEmbed } = require('discord.js');
const { color } = require('../config.json');

module.exports = {
	name: 'messageReactionAdd',
	once: false,
	async execute(messageReaction, user) {
		try {
			if (user.bot || messageReaction.emoji.name != ticketToolsService.reactionCreateTicket) return;

			messageReaction.users.remove(user);

			const ticketMessage = await ticketToolsService.getTicketMessagegAsync();

			if (messageReaction.message.id === ticketMessage.message_id) {

				const category = messageReaction.message.guild.channels.cache.find(c => c.id === ticketMessage.category_id);
				const everyoneRole = messageReaction.message.guild.roles.cache.find(r => r.name === '@everyone');

				if (!category || !everyoneRole) {
					messageReaction.remove().catch(console.error);
					return messageReaction.message.channel.send('La création de ticket est indisponible, veuillez contacter un admin');
				}

				const optionsChannel = {
					type: 'text',
					parent: category,
					permissionOverwrites: [
						{
							id: user.id,
							allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
							deny: [ 'ADD_REACTIONS' ],
						},
						{
							id: everyoneRole.id,
							deny: ['VIEW_CHANNEL'],
						},
					],
				};

				const rolesChannelId = await roleService.getRolesForTicket();
				const rolesMentions = [];

				rolesChannelId.map(roleId => {
					rolesMentions.push('<@&' + roleId + '>');
				});

				const channelName = ticketToolsService.getChannelName(ticketMessage.last_number);
				const ticketChannel = await messageReaction.message.guild.channels.create(channelName, optionsChannel);
				ticketChannel.send(rolesMentions.join(' '));

				const newTicketNumber = parseInt(ticketMessage.last_number) + 1;
				ticketToolsService.saveNewTicketNumber(newTicketNumber);

				const messageWelcomeTicket = new MessageEmbed()
					.setColor(color)
					.setDescription(`Bienvenue sur ton ticket <@${user.id}> \n 
									Ecris-nous le(s) motif(s) de ton ticket et un membre du staff reviendra vers toi dès que possible :wink: \n 
									Tu peux fermer le ticket avec le ${ticketToolsService.reactionCloseTicket}`);

				const ticket = await ticketChannel.send(messageWelcomeTicket);
				return ticket.react(ticketToolsService.reactionCloseTicket);
			}
		}
		catch (error) {
			console.error(error);
		}
	},
};