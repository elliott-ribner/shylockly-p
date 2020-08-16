import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserForValidate(username)
    const hashPword = user.password
    const isValidPass = await bcrypt.compare(pass, hashPword)
    if (isValidPass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(dbResp: any) {
    const payload = { email: dbResp.user.email, sub: dbResp.user.id }
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: 60 * 60 * 60 * 24 * 7 }),
    }
  }

  async refreshTokens(dbResp: any) {
    const payload = { email: dbResp.user.email, sub: dbResp.user.id }
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: 60 * 60 * 60 * 24 * 7 }),
    }
  }
}
