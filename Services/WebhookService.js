const { WebhookClient } = require('discord.js');
const { webhooks } = require('../config.json');


class WebhookService {

    serverKeeper;
    votesKeeper;

    constructor() {
        this.serverKeeper = new ServerKeeper();
        this.votesKeeper = new VotesKeeper();
    }

    isVotesKeeper(id) {
        if (this.votesKeeper.getId() === id) {
            return true;
        }
        else {
            return false
        }
    }
}

class ServerKeeper {

    private webhook: WebhookClient;
    private id = webhooks.serverKeeper.id;
    private token = webhooks.serverKeeper.token;

    public constructor() {
        this.webhook = new WebhookClient(this.id, this.token);
    }

    public send(message: string): void {
        this.webhook.send(message)
            .catch(console.error);
    }
}

class VotesKeeper {

    private webhook: WebhookClient;
    private id = webhooks.votesKeeper.id;
    private token = webhooks.votesKeeper.token;
    private lastMessageId: string;

    public constructor() {
        this.webhook = new WebhookClient(this.id, this.token);
    }

    public getId(): string {
        return this.id;
    }

    public send(message: string): void {
        this.webhook.send(message)
            .catch(console.error);
    }

    public hasLastMessage(): boolean {
        if (this.lastMessageId != null) {
            return true;
        }
        else {
            return false;
        }
    }

    public saveLastMessageId(id: string): void {
        if (this.lastMessageId === null || this.lastMessageId != id) {
            this.lastMessageId = id;
        }
    }
}

module.exports = {
    webhookService: new WebhookService()
}