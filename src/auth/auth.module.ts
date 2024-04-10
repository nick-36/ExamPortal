import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '@/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'aabrakadabra',
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class AuthModule {}
