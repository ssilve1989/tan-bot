import { Test, TestingModule } from '@nestjs/testing';
import { InsultsService } from './insults.service';
import { HttpModule } from '@nestjs/common';
import { BotModule } from '../bot/bot.module';
import { ConfigModule } from '../config/config.module';

describe('InsultsService', () => {
  let service: InsultsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BotModule, HttpModule, ConfigModule],
      providers: [InsultsService],
    }).compile();
    service = module.get<InsultsService>(InsultsService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
