import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

const { NODE_ENV = 'development' } = process.env;

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(`.env`),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
