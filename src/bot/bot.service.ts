import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import Discord from 'discord.js';

@Injectable()
export class BotService {
  private bot: Discord.Client;
  private readonly logger = new Logger(BotService.name);

  constructor(private readonly configService: ConfigService) {
    this.bot = new Discord.Client();
  }

  public initialize() {
    this.bot.once('ready', this.handleReady.bind(this));
    // TODO: Why is NestJS fucking up the "this" binding for the underlying Discord.Message?
    this.bot.on('message', this.defaultMsgHandlers.bind(this));
  }

  public getBot() {
    return this.bot;
  }

  public findUserByName(name: string): Discord.User | undefined {
    return this.bot.users.find(
      ({ username }: Discord.User) => username.toLowerCase() === name.toLowerCase(),
    );
  }

  public login() {
    const token = this.configService.getDiscordToken();
    return this.bot.login(token);
  }

  public destroy() {
    return this.bot.destroy();
  }

  private defaultMsgHandlers({ content, client, channel, mentions, author }: Discord.Message) {
    // Ignore our own messages
    if (author.equals(client.user)) return;

    // if (isMemberMentioned(client.user)) {
    if (content === '!ping') return channel.send('Pong.');
    if (content === '!info') return channel.send(`Channel Id: ${channel.id}`);
    //
  }

  private handleReady() {
    this.logger.log('tan-bot connected!');
  }
}
