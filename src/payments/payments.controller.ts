import { Controller, Request, Get, Param, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { PaymentsService } from './payments.service'
import { UsersService } from '../users/users.service'

@Controller('payments')
export class PaymentsController {
  constructor(private service: PaymentsService, private userService: UsersService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async get(@Param() params, @Request() req) {
    const user = await this.userService.getUser(req.user.userId)
    return this.service.getPayment(params.id, user.access_token)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async list(@Request() req) {
    const user = await this.userService.getUser(req.user.userId)
    return this.service.getPayments(user.access_token)
  }
}
