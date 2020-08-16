import { Injectable } from '@nestjs/common'
import { SchedulerRegistry } from '@nestjs/schedule'
import { CronJob } from 'cron'

@Injectable()
export class ScheduleService {
  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  addJob(time: string, name: string, cb: any) {
    const job = new CronJob(time, () => cb())
    this.schedulerRegistry.addCronJob(name, job)
    job.start()
  }
}
