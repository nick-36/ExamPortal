import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { CurrentUserDto } from '@/shared/dto/current-user.dto';

@Injectable()
export class TestsService {
  constructor(private prisma: PrismaService) {}

  async create(createTestDto: CreateTestDto, currentUser: CurrentUserDto) {
    const data = {
      ...createTestDto,
      testGroupId: createTestDto.testGroupId,
      creatorId: currentUser.userId,
    };

    return await this.prisma.test.create({ data: data });
  }

  async findAll() {
    return await this.prisma.test.findMany();
  }

  async findOne(id: string) {
    const found = await this.prisma.test.findUnique({ where: { id } });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async update(id: string, updateTestDto: UpdateTestDto) {
    const data = {
      ...updateTestDto,
      testGroupId: updateTestDto.testGroupId,
    };
    const found = await this.prisma.test.update({
      where: { id },
      data: data,
    });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async remove(id: string) {
    const found = await this.prisma.test.findUnique({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException('Question group not found');
    }
    return this.prisma.test.delete({ where: { id } });
  }
}
