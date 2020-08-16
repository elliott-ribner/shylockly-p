import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RulesService } from './rules.service'
import { RulesController } from './rules.controller'
import { Rule } from './rule.entity'
import { User } from '../users/user.entity'
import { UsersModule } from '../users/users.module'
import { UsersService } from '../users/users.service'

@Module({
  imports: [TypeOrmModule.forFeature([Rule]), UsersModule, TypeOrmModule.forFeature([User])],
  providers: [RulesService, UsersService],
  controllers: [RulesController],
})
export class RulesModule {}
