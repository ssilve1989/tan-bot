import { Test, TestingModule } from '@nestjs/testing';
import { InsultsService } from './insults.service';

describe('InsultsService', () => {
  let service: InsultsService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InsultsService],
    }).compile();
    service = module.get<InsultsService>(InsultsService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
