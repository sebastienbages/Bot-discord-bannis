module.exports = {
	name: 'voteMessage',
	execute(message, connection) {

		connection.query('SELECT message_id as message, channel_id as channel FROM f1mtb0ah6rjbwawm.messages WHERE name = "vote"', function(err, rows) {
			if (err) return console.error;

			if(rows.length != 0) {
				const lastMessage = rows[0];
				const channel = message.guild.channels.cache.find(c => c.id === lastMessage.channel);

				if (channel) {
					channel.messages.fetch(lastMessage.message)
						.then(msg => msg.delete())
						.catch(console.error);
				}
			}
		});

		connection.query('UPDATE f1mtb0ah6rjbwawm.messages SET message_id = ? WHERE (name = "vote")', [ message.id ], function(err) {
			if (err) return console.error;
		});
	},
};