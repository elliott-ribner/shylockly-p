import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Rule {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  organisationId: string

  @Column()
  sendSlackNotice: boolean

  @Column()
  slackWebhookUrl: string

  @Column()
  createZenhubTicket: boolean

  @Column()
  retryPayment: boolean

  @Column({ nullable: true })
  retryPaymentIntervalMins1: number

  @Column({ nullable: true })
  retryPaymentIntervalMins2: number

  @Column({ nullable: true })
  retryPaymentIntervalMins3: number

  @Column({ nullable: true })
  failedPaymentEmailContent: string

  @Column({ nullable: true })
  mandateEmailContent: string

  @Column({ nullable: true })
  failedPaymentEmailSubject: string

  @Column({ nullable: true })
  mandateEmailSubject: string

  @Column({ nullable: true })
  fromEmail: string

  @Column({ nullable: true })
  fromName: string

  @Column({ nullable: true })
  replyToEmail: string

  @Column({ nullable: true })
  replyToName: string
}
