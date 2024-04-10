import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuestionGroupsService } from './question-groups.service';
import { CreateQuestionGroupDto } from './dto/create-question-group.dto';
import { UpdateQuestionGroupDto } from './dto/update-question-group.dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { QuestionGroupEntity } from './entities/question-group.entity';

@Controller('question-groups')
@ApiTags('Question-groups')
export class QuestionGroupsController {
  constructor(private readonly questionGroupsService: QuestionGroupsService) {}

  @Post()
  @ApiOkResponse({ type: QuestionGroupEntity })
  @ApiOperation({ summary: 'Question Group Creation' })
  @ApiResponse({
    status: 200,
    description: 'The record found',
    type: [CreateQuestionGroupDto],
  })
  create(@Body() createQuestionGroupDto: CreateQuestionGroupDto) {
    return this.questionGroupsService.create(createQuestionGroupDto);
  }

  @Get()
  @ApiOkResponse({ type: QuestionGroupEntity, isArray: true })
  @ApiOperation({ summary: 'Get All Question Groups' })
  findAll() {
    return this.questionGroupsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: QuestionGroupEntity })
  @ApiOperation({ summary: 'Get Question Group By Id' })
  findOne(@Param('id') id: string) {
    return this.questionGroupsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: QuestionGroupEntity })
  @ApiOperation({ summary: 'Update Question Group By Id' })
  update(
    @Param('id') id: string,
    @Body() updateQuestionGroupDto: UpdateQuestionGroupDto,
  ) {
    return this.questionGroupsService.update(id, updateQuestionGroupDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: QuestionGroupEntity })
  @ApiOperation({ summary: ' Question Group By Id' })
  remove(@Param('id') id: string) {
    return this.questionGroupsService.remove(id);
  }
}
