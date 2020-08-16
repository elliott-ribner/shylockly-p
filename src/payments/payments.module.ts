import { Module } from '@nestjs/common'
import { PaymentsService } from './payments.service'
import { PaymentsController } from './payments.controller'
import { UsersModule } from '../users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../users/user.entity'

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([User])],
  providers: [PaymentsService],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
