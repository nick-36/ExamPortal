import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from '@/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser({ username, password }: SignInDto) {
    const user = await this.userService.findByUserName(username);
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found!`);
    }
    const isPasswordMatch = await this.comparePassword({
      password,
      hash: user?.password,
    });
    if (!isPasswordMatch) {
      throw new BadRequestException('WRONG CREDENTIALS');
    }
    const payload = { sub: user.id, userId:user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp({ username, password, email, mobile }: SignUpDto) {
    const user = await this.userService.findByUserName(username);
    if (user) {
      throw new HttpException('user_already_exist', HttpStatus.CONFLICT);
    }
    const saltOrRounds = 12;
    const hashPassword = await bcrypt.hash(password, saltOrRounds);

    return this.userService.create({
      username,
      email,
      mobile,
      password: hashPassword,
    });
  }

  async comparePassword(args: { password: string; hash: string }) {
    return await bcrypt.compare(args.password, args.hash);
  }
}
