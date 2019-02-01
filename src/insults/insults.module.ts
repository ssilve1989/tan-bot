import { Module, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { BotModule } from '../bot/bot.module';
import { InsultsService } from './insults.service';

@Module({
  imports: [BotModule],
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
