import { Injectable, Logger, HttpService } from '@nestjs/common';
import moment from 'moment';
import { GroupDMChannel, Channel } from 'discord.js';

import { ConfigService } from '../config/config.service';
import { BotService } from '../bot/bot.service';
import { Channels } from '../consts/channels';
import { Users } from '../consts/users';
import { getHours, getRandomIntInclusive } from '../utils';
import { Subject } from 'rxjs';
import { map, retry } from 'rxjs/operators';

type InsultPayload = {
  insult: string;
  userId: string;
  channel: Channel | GroupDMChannel;
};

@Injectable()
export class InsultsService {
  private static readonly MAX_RETRY_ATTEMPTS = 10;
  private static readonly INSULT_URL =
    'https://evilinsult.com/generate_insult.php?lang=en&type=json';
  private static readonly INTERVAL_RANGE = [getHours(2), getHours(16)];
  private timer: NodeJS.Timer;
  private readonly logger = new Logger(InsultsService.name);
  private readonly stream$ = new Subject<InsultPayload>();
  private readonly insults = new Set<string>();

  constructor(
    private readonly configService: ConfigService,
    private readonly botService: BotService,
    private readonly httpService: HttpService,
  ) {
    this.stream$
      .pipe(
        map(payload => {
          const { insult } = payload;
          if (this.insults.has(insult)) {
            throw new Error('Received an insult that has already been used');
          }
          return payload;
        }),
        retry(InsultsService.MAX_RETRY_ATTEMPTS),
      )
      .subscribe({
        next: payload => this.sendInsult(payload),
        error: () =>
          this.logger.warn(
            `Retried ${InsultsService.MAX_RETRY_ATTEMPTS} times and received no new insults`,
          ),
      });
  }

  public start() {
    this.logger.log('Starting insult interval');
    this.run();
  }

  public stop() {
    this.logger.log('Stopping insult interval');
    this.botService.getBot().clearTimeout(this.timer);
    this.insults.clear();
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
      this.getInsult(Channels.Developer_Things, Users.Northerr);
    }
    // Insult Tan!
    this.getInsult(Channels.Chats, Users.Tan);
  }

  private async sendInsult({ channel, userId, insult }: InsultPayload) {
    try {
      (channel as GroupDMChannel).send(`<@${userId}> ${insult}`);
      this.insults.add(insult);
    } catch (e) {
      this.logger.error(e.stack);
    }
  }

  private async getInsult(channelId: string, userId: string) {
    const bot = this.botService.getBot();
    const channel = bot.channels.get(channelId);

    if (!channel) {
      this.logger.error(`Invalid channelId: ${channelId}`);
      return;
    }

    try {
      const insult = await this.fetchInsult();
      this.stream$.next({ channel, userId, insult });
    } catch (e) {
      this.logger.error(`Error sending insult: ${e}`);
    }
  }

  private async fetchInsult() {
    const {
      data: { insult },
    } = await this.httpService.post(InsultsService.INSULT_URL).toPromise();
    return insult;
  }
}
