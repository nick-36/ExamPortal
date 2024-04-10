import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { LocalAuthGuard } from './guards/local.guard';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({
    status: 200,
    description: 'The record found',
    type: [CreateUserDto],
  })
  @UseGuards(LocalAuthGuard)
  signIn(
    @Req() req: Request,
    @Res() res: Response,
    @Body() signInDto: SignInDto,
  ) {
    res.cookie('access_token', req.user);

    return res.send({
      isSuccess: true,
      messsage: 'Logged In Successfully!',
      //TODO REMOVE ON PROD
      ...req.user,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  @ApiOperation({ summary: 'User SignUp' })
  @ApiResponse({
    status: 200,
    description: 'The record found',
    type: [CreateUserDto],
  })
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  // @HttpCode(HttpStatus.OK)
  // @Get('signout')
  // @ApiOperation({ summary: 'User SignOut' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Logged out Successfully!',
  // })

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get('signout')
  signOut(@Res() res: Response) {
    res.clearCookie('access_token');
    return res.send({
      isSuccess: true,
      messsage: 'Logged out Successfully!',
    });
  }
}
