import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TestsService } from './tests.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { Request } from 'express';
import { CurrentUserDto } from '@/shared/dto/current-user.dto';

@Controller('tests')
@ApiTags('Tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createTestDto: CreateTestDto, @Req() req: Request) {
    const user = req.user as CurrentUserDto;
    return this.testsService.create(createTestDto, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.testsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.testsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testsService.update(id, updateTestDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.testsService.remove(id);
  }
}
