import { Test, TestingModule } from '@nestjs/testing';
import { BotService } from './bot.service';
import { ConfigModule } from '../config/config.module';

describe('BotService', () => {
  let service: BotService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [BotService],
    }).compile();
    service = module.get<BotService>(BotService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
