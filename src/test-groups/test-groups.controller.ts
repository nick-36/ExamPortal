import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TestGroupsService } from './test-groups.service';
import { CreateTestGroupDto } from './dto/create-test-group.dto';
import { UpdateTestGroupDto } from './dto/update-test-group.dto';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { CurrentUserDto } from '@/shared/dto/current-user.dto';

@Controller('test-groups')
@ApiTags('Test-groups')
export class TestGroupsController {
  constructor(private readonly testGroupsService: TestGroupsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createTestGroupDto: CreateTestGroupDto, @Req() req: Request) {
    const user = req.user as CurrentUserDto;
    return this.testGroupsService.create(createTestGroupDto, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.testGroupsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.testGroupsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateTestGroupDto: UpdateTestGroupDto,
  ) {
    return this.testGroupsService.update(id, updateTestGroupDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.testGroupsService.remove(id);
  }
}
