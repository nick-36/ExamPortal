import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UpdateUserDto } from '@/users/dto/update-user.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from '@/users/entities/user.entity';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { RoleGuard } from '@/auth/guards/role.guard';
import { Roles } from '@/auth/decorators/roles.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt.guard';

@Controller('users')
@ApiTags('Users')
@ApiSecurity('JWT-auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // @ApiCreatedResponse({ type: UserEntity })
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  // @Roles(['ADMIN'])
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get()
  @ApiOkResponse({ type: UserEntity })
  findByUserName(@Param('username') username: string) {
    return this.usersService.findByUserName(username);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserEntity })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
