import { Controller, Request, Get, Param, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { MandatesService } from './mandates.service'
import { UsersService } from '../users/users.service'

@Controller('mandates')
export class MandatesController {
  constructor(private service: MandatesService, private userService: UsersService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async get(@Param() params, @Request() req) {
    const user = await this.userService.getUser(req.user.userId)
    return this.service.getMandate(params.id, user.access_token)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async list(@Request() req) {
    const user = await this.userService.getUser(req.user.userId)
    return this.service.getMandates(user.access_token)
  }
}
