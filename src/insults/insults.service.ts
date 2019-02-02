import { Injectable, Logger, HttpService } from '@nestjs/common';
import moment from 'moment';
import { GroupDMChannel } from 'discord.js';

import { ConfigService } from '../config/config.service';
import { BotService } from '../bot/bot.service';
import { Channels } from '../consts/channels';
import { Users } from '../consts/users';
import { getHours, getRandomIntInclusive } from '../utils';

@Injectable()
export class InsultsService {
  private static INSULT_URL = 'https://evilinsult.com/generate_insult.php?lang=en&type=json';
  private static INTERVAL_RANGE = [getHours(2), getHours(16)];
  private timer: NodeJS.Timer;
  private logger = new Logger(InsultsService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly botService: BotService,
    private readonly httpService: HttpService,
  ) {}

  public start() {
    this.logger.log('Starting insult interval');
    this.run();
  }

  public stop() {
    this.logger.log('Stopping insult interval');
    this.botService.getBot().clearTimeout(this.timer);
  }

  private run() {
    const [min, max] = InsultsService.INTERVAL_RANGE;
    const timer = getRandomIntInclusive(min, max);

    this.logger.log(
      `Next insult scheduled for ${moment()
        .add(timer / 1000, 'seconds')
        .format('MM/DD/YY hh:mm:ss A Z')}`,
    );

    this.timer = this.botService.getBot().setTimeout(() => {
      this.insultWorker();
      this.run();
    }, timer);
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

    if (!channel) {
      this.logger.error(`Invalid channelId: ${channelId}`);
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
