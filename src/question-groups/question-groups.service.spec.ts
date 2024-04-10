import { Test, TestingModule } from '@nestjs/testing';
import { QuestionGroupsService } from './question-groups.service';

describe('QuestionGroupsService', () => {
  let service: QuestionGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionGroupsService],
    }).compile();

    service = module.get<QuestionGroupsService>(QuestionGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
