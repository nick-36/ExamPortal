import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { Request } from 'express';
import { CurrentUserDto } from '@/shared/dto/current-user.dto';

@Controller('questions')
@ApiTags('Questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createQuestionDto: CreateQuestionDto,@Req() req:Request) {
    const user = req?.user as CurrentUserDto
    return this.questionsService.create(createQuestionDto,user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.questionsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionsService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.questionsService.remove(id);
  }
}
