import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EventsService } from './events.service'
import { EventsController } from './events.controller'
import { Event } from './event.entity'
import { Detail } from './details/detail.entity'
import { Link } from './links/link.entity'
import { Rule } from '../rules/rule.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Event, Detail, Link]), TypeOrmModule.forFeature([Rule])],
  providers: [EventsService],
  controllers: [EventsController],
})
export class EventsModule {}
