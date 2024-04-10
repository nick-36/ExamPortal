import { Test, TestingModule } from '@nestjs/testing';
import { QuestionGroupsController } from './question-groups.controller';
import { QuestionGroupsService } from './question-groups.service';

describe('QuestionGroupsController', () => {
  let controller: QuestionGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionGroupsController],
      providers: [QuestionGroupsService],
    }).compile();

    controller = module.get<QuestionGroupsController>(QuestionGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
