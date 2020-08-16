import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from './jwt-auth.guard'
import { LocalAuthGuard } from './local-auth.guard'
import { UsersService } from '../users/users.service'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req)
  }

  @Get('logout')
  async logout(@Request() req) {
    return req.logout()
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.userService.getUserByEmail(req.user.email)
  }

  @UseGuards(JwtAuthGuard)
  @Post('gc-token')
  updateToken(@Request() req) {
    const userId: number = req.user.userId
    const code: string = req.body.code
    return this.userService.updateUserToken(userId, code)
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh_token')
  refreshToken(@Request() req) {
    return this.authService.refreshTokens(req)
  }
}
