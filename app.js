const { Client, Collection } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const client = new Client();
client.commands = new Collection();
client.cooldowns = new Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

client.services = new Collection();

const servicesFiles = fs.readdirSync('./services').filter(file => file.endsWith('.js'));

for (const file of servicesFiles) {
	const service = require(`./services/${file}`);
	client.services.set(service.name, service);
}

client.login(process.env.TOKEN);