import { Module, OnModuleInit, OnModuleDestroy, HttpModule } from '@nestjs/common';
import { BotModule } from '../bot/bot.module';
import { InsultsService } from './insults.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule, BotModule, HttpModule],
  providers: [InsultsService],
})
export class InsultsModule implements OnModuleInit, OnModuleDestroy {
  public constructor(private readonly insultService: InsultsService) {}

  onModuleInit() {
    this.insultService.start();
  }

  onModuleDestroy() {
    this.insultService.stop();
  }
}
