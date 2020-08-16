import { Injectable, Logger } from '@nestjs/common'
import axios from 'axios'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name)

  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find()
  }

  async getUser(_id: string): Promise<User> {
    return await this.usersRepository.findOne({
      // temporily removed - user service is likely managed by another microservice - just working with a single user
      where: [{ id: _id }],
    })
  }
  async getUserByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({
      // temporily removed - user service is likely managed by another microservice - just working with a single user
      where: [{ email: email }],
      select: ['created_at', 'email', 'organisation_id', 'company'],
    })
  }

  async getUserForValidate(email: string): Promise<User> {
    return await this.usersRepository.findOne({
      // temporily removed - user service is likely managed by another microservice - just working with a single user
      where: [{ email: email }],
    })
  }

  async createUser(user: User) {
    return await this.usersRepository.save(user)
  }

  async updateUserToken(userId: number, code: string) {
    try {
      const userRecord = await this.usersRepository.findOne({
        // temporily removed - user service is likely managed by another microservice - just working with a single user
        where: [{ id: userId }],
      })
      const data = {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'http://localhost:3000/callback',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      }
      const response = await axios({
        method: 'post',
        url: 'https://connect-sandbox.gocardless.com/oauth/access_token',
        data,
      })
      const { access_token, organisation_id } = response.data
      userRecord.access_token = access_token
      userRecord.organisation_id = organisation_id
      return await this.usersRepository.save(userRecord)
    } catch (e) {
      this.logger.error(e)
      throw e
    }
  }

  async updateUser(user: User) {
    return await this.usersRepository.save(user)
  }

  async deleteUser(user: User) {
    return await this.usersRepository.delete(user)
  }
}
