import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { CurrentUserDto } from '@/shared/dto/current-user.dto';
// import { PrismaClient } from '@prisma/client';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createQuestionDto: CreateQuestionDto,
    currentUser: CurrentUserDto,
  ) {
    const data = {
      ...createQuestionDto,
      creatorId: currentUser?.userId,
    } as any;
    return await this.prisma.question.create({ data: data });
  }

  async findAll() {
    return await this.prisma.question.findMany();
  }

  async findOne(id: string) {
    const found = await this.prisma.question.findUnique({ where: { id } });

    if (!found) {
      return new NotFoundException();
    }
    return found;
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    const found = await this.prisma.question.update({
      where: { id },
      data: updateQuestionDto,
    });

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  async remove(id: string) {
    const found = await this.prisma.question.findUnique({ where: { id } });

    if (!found) {
      return new NotFoundException();
    }

    return this.prisma.question.delete({ where: { id } });
  }
}
