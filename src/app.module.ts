import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TestsModule } from './tests/tests.module';
import { TestGroupsModule } from './test-groups/test-groups.module';
import { QuestionsModule } from './questions/questions.module';
import { QuestionGroupsModule } from './question-groups/question-groups.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    TestsModule,
    TestGroupsModule,
    QuestionsModule,
    QuestionGroupsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
