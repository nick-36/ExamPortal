import { Module } from '@nestjs/common';
import { QuestionGroupsService } from './question-groups.service';
import { QuestionGroupsController } from './question-groups.controller';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [QuestionGroupsController],
  providers: [QuestionGroupsService],
})
export class QuestionGroupsModule {}
