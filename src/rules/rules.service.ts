import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Rule } from './rule.entity'
import { User } from '../users/user.entity'

@Injectable()
export class RulesService {
  constructor(
    @InjectRepository(Rule) private rulesRepository: Repository<Rule>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getRules(): Promise<Rule[]> {
    return await this.rulesRepository.find()
  }

  async getRule(_id: number): Promise<Rule[]> {
    return await this.rulesRepository.find({
      where: [{ id: _id }],
    })
  }

  async createRule(rule: Rule, userId: string) {
    const user = await this.usersRepository.findOne({
      where: [{ id: userId }],
    })
    rule.organisationId = user.organisation_id
    return await this.rulesRepository.save(rule)
  }

  async updateRule(rule: Rule) {
    return await this.rulesRepository.save(rule)
  }

  async deleteRule(rule: Rule) {
    return await this.rulesRepository.delete(rule)
  }
}
