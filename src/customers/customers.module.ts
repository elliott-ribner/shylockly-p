import { Module } from '@nestjs/common'
import { CustomersService } from './customers.service'
import { CustomersController } from './customers.controller'
import { UsersModule } from '../users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../users/user.entity'

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([User])],
  providers: [CustomersService],
  controllers: [CustomersController],
})
export class CustomersModule {}
