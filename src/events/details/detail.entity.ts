import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm'

@Entity()
export class Detail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({
    nullable: true,
    comment: 'What triggered the event.',
  })
  cause?: string | null

  @Column({
    nullable: true,
    comment: 'Human readable description of the cause.',
  })
  description?: string | null

  @Column({
    comment: `
            Who initiated the event. One of:
            - bank: this event was triggered by a report from the banks
            - gocardless: this event was performed by GoCardless automatically
            - api: this event was triggered by an API endpoint
            - customer: this event was triggered by a Customer
        `,
  })
  origin: string

  @Column({
    nullable: true,
    comment: `
            Set when a bank is the origin of the event. This is the reason code received in the report from the customer’s bank. 
            See the GoCardless Direct Debit guide for information on the meanings of different reason codes. Note: reason_code is 
            payment scheme-specific and can be inconsistent between banks.
        `,
  })
  reason_code?: string | null

  @Column({
    nullable: true,
    comment: 'A Direct Debit scheme. Set when a bank is the origin of the event',
  })
  scheme?: string | null
}
