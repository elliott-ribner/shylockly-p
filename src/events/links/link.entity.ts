import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm'

@Entity()
export class Link extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({
    nullable: true,
    comment: 'If resource_type is mandates, this is the ID of the mandate which has been updated.',
  })
  mandate?: string | null

  @Column({
    nullable: true,
    comment:
      'This is only included for mandate transfer events, when it is the ID of the customer bank account which the mandate is being transferred to.',
  })
  new_customer_bank_account?: string | null

  @Column({
    nullable: true,
    comment:
      'This is only included for mandate replaced events, when it is the ID of the new mandate that replaces the existing mandate.',
  })
  new_mandate?: string | null

  @Column({
    nullable: true,
    comment:
      'If the event is included in a webhook to an OAuth app, this is the ID of the account to which it belongs.',
  })
  organization?: string | null

  @Column({
    nullable: true,
    comment: `If this event was caused by another, this is the ID of the cause. For example, if a mandate is cancelled it automatically 
        cancels all pending payments associated with it; in this case, the payment cancellation events would have the ID of the mandate cancellation 
        event in this field.`,
  })
  parent_event?: string | null

  @Column({
    nullable: true,
    comment: 'If resource_type is payments, this is the ID of the payment which has been updated.',
  })
  payment?: string | null

  @Column({
    nullable: true,
    comment: 'If resource_type is payouts, this is the ID of the payout which has been updated.',
  })
  payout?: string | null

  @Column({
    nullable: true,
    comment:
      'This is only included for mandate transfer events, when it is the ID of the customer bank account which the mandate is being transferred from.',
  })
  previous_customer_bank_account?: string | null

  @Column({
    nullable: true,
    comment: 'If resource_type is refunds, this is the ID of the refund which has been updated.',
  })
  refund?: string | null

  @Column({
    nullable: true,
    comment: 'If resource_type is subscription, this is the ID of the subscription which has been updated.',
  })
  subscription?: string | null
}
