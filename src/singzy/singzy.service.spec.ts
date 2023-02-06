import { Test, TestingModule } from '@nestjs/testing';
import { SingzyService } from './singzy.service';

describe('SingzyService', () => {
  let service: SingzyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SingzyService],
    }).compile();

    service = module.get<SingzyService>(SingzyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
