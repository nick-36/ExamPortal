import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestGroupDto } from './dto/create-test-group.dto';
import { UpdateTestGroupDto } from './dto/update-test-group.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
import { CurrentUserDto } from '@/shared/dto/current-user.dto';

@Injectable()
export class TestGroupsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    createTestGroupDto: CreateTestGroupDto,
    currentUser: CurrentUserDto,
  ) {
    const data = {
      ...createTestGroupDto,
      creatorId: currentUser?.userId,
    };
    return await this.prisma.testGroup.create({ data: data });
  }

  async findAll() {
    return await this.prisma.testGroup.findMany();
  }

  async findOne(id: string) {
    const found = await this.prisma.testGroup.findUnique({ where: { id } });

    if (!found) {
      return new NotFoundException();
    }
    return found;
  }

  async update(id: string, updateTestGroupDto: UpdateTestGroupDto) {
    const found = await this.prisma.testGroup.update({
      where: { id },
      data: updateTestGroupDto,
    });

    if (!found) {
      throw new NotFoundException(`Test group with ID ${id} not found`);
    }
    return found;
  }

  async remove(id: string) {
    try {
      return await this.prisma.testGroup.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        // The record with the specified ID was not found
        throw new NotFoundException(`Test group with ID ${id} not found`);
      }
      // Propagate other errors
      throw error;
    }
  }
}
