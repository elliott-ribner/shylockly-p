import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    comment: 'go cardless access token',
    default: null,
  })
  access_token: string | null

  @Column('date', {
    comment: 'Fixed timestamp, recording when this resource was created.',
    default: new Date(),
  })
  created_at: Date

  @Column({
    comment: `The code used to obtain the access token`,
    default: null,
  })
  code: string | null

  @Column({
    comment: `Name of the company`,
  })
  company: string

  @Column({
    comment: `go cardless organisation id`,
    default: null,
  })
  organisation_id: string | null

  @Column({
    comment: `user email`,
    default: null,
  })
  email: string | null

  @Column({
    comment: `user password`,
    default: null,
  })
  password: string | null
}
