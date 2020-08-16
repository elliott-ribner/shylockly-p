import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MandatesService } from './mandates.service'
import { MandatesController } from './mandates.controller'
import { User } from '../users/user.entity'
import { UsersModule } from '../users/users.module'
import { UsersService } from '../users/users.service'
import { Detail } from '../events/details/detail.entity'
import { Link } from '../events/links/link.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Detail, Link]), UsersModule, TypeOrmModule.forFeature([User])],
  providers: [MandatesService, UsersService],
  controllers: [MandatesController],
})
export class MandatesModule {}
