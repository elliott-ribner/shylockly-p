import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Event } from './event.entity'
import { handleEvent } from '../events/event.handler/index'
import { Rule } from '../rules/rule.entity'

@Injectable()
export class EventsService {
  // Creating an instance of the logger specific to our class - rather than using the static logger methods - shows better context in log messages
  private readonly logger = new Logger(EventsService.name)
  constructor(
    @InjectRepository(Event) private eventsRepository: Repository<Event>,
    @InjectRepository(Rule) private rulesRepository: Repository<Rule>,
  ) {}

  async getEvents(): Promise<Event[]> {
    return await this.eventsRepository.find({
      relations: ['details', 'links'],
      order: {
        created_at: 'DESC',
      },
    })
  }

  async getEvent(_id: string): Promise<Event> {
    return await this.eventsRepository.findOne({
      where: [{ id: _id }],
      relations: ['details', 'links'],
    })
  }

  async createEvents(events: Event[], orgId: string) {
    try {
      await Promise.all(
        events.map((event) => {
          event.go_cardless_id = event.id.toString(2)
          delete event.id
          event.organisationId = orgId
          const duplicateUniqueKeyErrorCode = '23505'
          return this.eventsRepository
            .save(event)
            .then(async () => {
              const rule = await this.rulesRepository.findOne({
                where: [{ organisationId: orgId }],
              })
              return handleEvent({ event, rule })
              // TODO - this is a non duplicate gocardless event, call gocardless module, schedule agenda event
            })
            .catch((e) => {
              if (e.code === duplicateUniqueKeyErrorCode) {
                this.logger.error(`record with go cardless id of ${event.go_cardless_id} has already been created`)
              } else {
                this.logger.error(`save error on ${event.go_cardless_id}`)
              }
            })
        }),
      )
      return 'success'
    } catch (e) {
      throw e
    }
  }

  async updateEvent(event: Event) {
    this.eventsRepository.save(event)
  }

  async deleteEvent(event: Event) {
    this.eventsRepository.delete(event)
  }
}
