import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalStrategy } from './local.strategy'
import { JwtStrategy } from './jwt.strategy'
import { UsersModule } from '../users/users.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants'
import { AuthController } from './auth.controller'
import { UsersService } from '../users/users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../users/user.entity'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
    UsersModule,
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, UsersService],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
