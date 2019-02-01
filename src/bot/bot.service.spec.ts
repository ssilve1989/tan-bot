import { Test, TestingModule } from '@nestjs/testing';
import { BotService } from './bot.service';

describe('BotService', () => {
  let service: BotService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BotService],
    }).compile();
    service = module.get<BotService>(BotService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
