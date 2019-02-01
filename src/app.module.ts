import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { BotModule } from './bot/bot.module';
import { InsultsModule } from './insults/insults.module';

@Module({
  imports: [ConfigModule, BotModule, InsultsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
