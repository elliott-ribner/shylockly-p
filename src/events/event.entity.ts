import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, Unique } from 'typeorm'
import { Detail } from './details/detail.entity'
import { Link } from './links/link.entity'

@Entity()
@Unique(['go_cardless_id'])
export class Event {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    comment: 'What has happened to the resource.',
  })
  action: string

  @Column({
    comment: 'GC organisation_id field',
  })
  organisationId: string

  @Column('date', {
    comment: 'Fixed timestamp, recording when this resource was created.',
  })
  created_at: Date

  @Column({
    comment: `The resource type for this event. Valid choices: "payments", "mandates", "payouts", "refunds", "subscriptions"`,
  })
  resource_type: string

  @Column({
    nullable: true,
    comment: "Unique identifier, beginning with “EV”. Mapped from API's 'id' column",
  })
  go_cardless_id?: string | null

  @Column({
    type: 'json',
    comment: `If the details[origin] is api, this will contain any metadata you specified when triggering this event. 
                  In other cases it will be an empty object. Stored as JSON`,
  })
  metadata: string

  @OneToOne(() => Detail, (details) => details.id, { cascade: true })
  @JoinColumn()
  details: Detail

  @OneToOne(() => Link, (links) => links.id, { cascade: true })
  @JoinColumn()
  links: Link
}
