import { Test, TestingModule } from '@nestjs/testing';
import { MokingService } from './moking.service';

describe('MokingService', () => {
  let service: MokingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MokingService],
    }).compile();

    service = module.get<MokingService>(MokingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
