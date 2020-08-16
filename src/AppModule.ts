import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as dotenv from 'dotenv'
import { join } from 'path'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ScheduleModule } from '@nestjs/schedule'
import { SchedulerRegistry } from '@nestjs/schedule'
import { RulesModule } from './rules/rules.module'
import { Rule } from './rules/rule.entity'
import { EventsModule } from './events/events.module'
import { Event } from './events/event.entity'
import { Detail } from './events/details/detail.entity'
import { Link } from './events/links/link.entity'
import { User } from './users/user.entity'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { CustomersModule } from './customers/customers.module'
import { PaymentsModule } from './payments/payments.module'
import { MandatesModule } from './mandates/mandates.module'

dotenv.config()

@Module({
  controllers: [],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOSTNAME,
      port: Number.parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
      ssl: process.env.DB_USE_SSL === 'true' || false,
      entities: [Event, Rule, Detail, Link, User],
    }),
    EventsModule,
    RulesModule,
    CustomersModule,
    PaymentsModule,
    UsersModule,
    AuthModule,
    MandatesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend', 'dist'),
    }),
    ScheduleModule.forRoot(),
    SchedulerRegistry,
  ],
})
export class AppModule {}
