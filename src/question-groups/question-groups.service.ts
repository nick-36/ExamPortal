import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionGroupDto } from './dto/create-question-group.dto';
import { UpdateQuestionGroupDto } from './dto/update-question-group.dto';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class QuestionGroupsService {
  constructor(private prisma: PrismaService) {}
  create(createQuestionGroupDto: CreateQuestionGroupDto) {
    const data = {
      ...createQuestionGroupDto,
      creatorId: createQuestionGroupDto.creatorId,
    };
    return this.prisma.questionGroup.create({ data: data });
  }

  findAll() {
    return this.prisma.questionGroup.findMany();
  }

  async findOne(id: string) {
    const foundGroup = await this.prisma.questionGroup.findUnique({
      where: { id },
    });

    if (!foundGroup) {
      throw new NotFoundException();
    }
    return foundGroup;
  }

  update(id: string, updateQuestionGroupDto: UpdateQuestionGroupDto) {
    const foundGroup = this.prisma.questionGroup.update({
      where: { id },
      data: updateQuestionGroupDto,
    });

    if (!foundGroup) {
      throw new NotFoundException();
    }
    return foundGroup;
  }

  async remove(id: string) {
    const existingGroup = await this.prisma.questionGroup.findUnique({
      where: { id },
    });
    if (!existingGroup) {
      throw new NotFoundException('Question group not found');
    }
    // Remove association between questions and the group being deleted
    await this.removeAssociationWithGroup(id);

    // Delete the group
    return this.prisma.questionGroup.delete({ where: { id } });
  }

  private async removeAssociationWithGroup(groupId: string) {
    // Find questions associated with the group
    const associatedQuestions = await this.prisma.question.findMany({
      where: {
        questionGroups: { some: { id: groupId } },
      },
    });

    // Remove association with the group for each associated question
    for (const question of associatedQuestions) {
      await this.prisma.question.update({
        where: { id: question.id },
        data: { questionGroups: { disconnect: { id: groupId } } },
      });
    }
  }
}
