import { Controller, Request, Post, Body, Get, Put, Delete, Param, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { EventsService } from './events.service'
import { Event } from './event.entity'

@Controller('events')
export class EventsController {
  constructor(private service: EventsService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  get(@Param() params) {
    return this.service.getEvent(params.id)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  list(@Request() req) {
    return this.service.getEvents()
  }

  @Post(':orgId')
  @UseGuards(JwtAuthGuard)
  create(@Param() params, @Body() events: Event[]) {
    return this.service.createEvents(events, params.orgId)
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  update(@Body() event: Event) {
    return this.service.updateEvent(event)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteRule(@Param() params) {
    return this.service.deleteEvent(params.id)
  }
}
