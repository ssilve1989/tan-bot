import { Module, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { BotService } from './bot.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [BotService],
  exports: [BotService],
})
export class BotModule implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly service: BotService) {}

  async onModuleInit() {
    this.service.initialize();
    await this.service.login();
  }

  async onModuleDestroy() {
    await this.service.destroy();
  }
}
