import { Injectable, Logger } from '@nestjs/common';
import Discord from 'discord.js';
import getInsult from 'insults';
import { CronJob } from 'cron';

import { ConfigService } from '../config/config.service';
import { BotService } from '../bot/bot.service';

@Injectable()
export class InsultsService {
  private static TEST_CHANNEL = '540983043247177761';
  private static INSULTS_TIMER = 1000 * 60 * 60; // 1 hour
  private cron: CronJob;
  private timer?: NodeJS.Timer;
  private logger = new Logger(InsultsService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly botService: BotService,
  ) {
    this.cron = new CronJob({
      cronTime: '0 0 * * *',
      onTick: this.sendInsult.bind(this),
    });
  }

  public start() {
    this.cron.start();
  }

  public stop() {
    this.cron.stop();
  }

  private sendInsult() {
    if (this.configService.sendTestInsults()) {
      this.sendTestInsult();
    }
    // TODO: other things
  }

  private sendTestInsult() {
    const bot = this.botService.getBot();
    const channel: Discord.Channel | undefined = bot.channels.get(InsultsService.TEST_CHANNEL);
    if (!channel) {
      this.logger.log('Test channel not found');
      return;
    }

    (channel as any).send(getInsult());
  }
}
