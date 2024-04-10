import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  findAll() {
    return this.prisma.user.findMany({ where: { isActive: true } });
  }

  async findOne(id: string) {
    const foundUser = await this.prisma.user.findUnique({ where: { id } });

    if (!foundUser) {
      throw new NotFoundException();
    }
    return foundUser;
  }

  async findByUserName(username: string) {
    const foundUser = this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!foundUser) {
      throw new NotFoundException();
    }
    return foundUser;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
