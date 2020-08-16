import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards, Request } from '@nestjs/common'
import { RulesService } from './rules.service'
import { Rule } from './rule.entity'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { UsersService } from '../users/users.service'

@Controller('rules')
export class RulesController {
  constructor(private service: RulesService, private userService: UsersService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  get(@Param() params) {
    return this.service.getRule(params.id)
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() rule: Rule, @Request() req) {
    return this.service.createRule(rule, req.user.userId)
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  // TODO, add request here and fetch actual org id from that
  async update(@Body() rule: Rule) {
    return this.service.updateRule(rule)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteRule(@Param() params) {
    return this.service.deleteRule(params.id)
  }
}
