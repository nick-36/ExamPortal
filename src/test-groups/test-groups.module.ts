import { Module } from '@nestjs/common';
import { TestGroupsService } from './test-groups.service';
import { TestGroupsController } from './test-groups.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { SharedModule } from '@/shared/shared.module';

@Module({
  imports: [PrismaModule],
  controllers: [TestGroupsController],
  providers: [TestGroupsService],
})
export class TestGroupsModule {}
