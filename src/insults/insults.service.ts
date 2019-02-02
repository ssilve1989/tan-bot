import { Injectable, Logger, HttpService } from '@nestjs/common';
import { GroupDMChannel, Channel, User } from 'discord.js';
import { CronJob } from 'cron';

import { ConfigService } from '../config/config.service';
import { BotService } from '../bot/bot.service';
import { Channels } from '../consts/channels';
import { Users } from '../consts/users';

@Injectable()
export class InsultsService {
  private static INSULT_URL = 'https://evilinsult.com/generate_insult.php?lang=en&type=json';
  private cron: CronJob;
  private logger = new Logger(InsultsService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly botService: BotService,
    private readonly httpService: HttpService,
  ) {
    this.cron = new CronJob({
      cronTime: '0 * * * * *',
      onTick: this.insultWorker.bind(this),
    });
  }

  public start() {
    this.logger.log('Starting insult interval');
    this.logger.log(`Next Insult scheduled for: ${this.cron.nextDates()}`);
    this.cron.start();
  }

  public stop() {
    this.logger.log('Stopping insult interval');
    this.cron.stop();
  }

  private async insultWorker() {
    if (this.configService.sendTestInsults()) {
      this.sendInsult(Channels.Developer_Things, Users.Northerr);
    }
    // Insult Tan!
    this.sendInsult(Channels.Chats, Users.Tan);
  }

  private async sendInsult(channelId: string, userId: string) {
    const bot = this.botService.getBot();
    const channel = bot.channels.get(channelId);
    const user = bot.users.get(userId);

    if (!channel || !user) {
      this.logger.error(`Invalid channelId/userId: ${channelId}/${userId}`);
      return;
    }

    try {
      const insult = await this.getInsult();
      (channel as GroupDMChannel).send(`<@${userId}> ${insult}`);
    } catch (e) {
      this.logger.error(`Error sending insult: ${e}`);
    }
  }

  private async getInsult() {
    const {
      data: { insult },
    } = await this.httpService.post(InsultsService.INSULT_URL).toPromise();
    return insult;
  }
}
