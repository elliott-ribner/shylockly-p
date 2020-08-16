import { Controller, Request, Get, Param, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { CustomersService } from './customers.service'
import { UsersService } from '../users/users.service'

@Controller('customers')
export class CustomersController {
  constructor(private service: CustomersService, private userService: UsersService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async get(@Param() params, @Request() req) {
    const user = await this.userService.getUser(req.user.userId)
    return this.service.getCustomer(params.id, user.access_token)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async list(@Request() req) {
    const user = await this.userService.getUser(req.user.userId)
    return this.service.getCustomers(user.access_token)
  }
}
