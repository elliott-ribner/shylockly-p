import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Detail } from './detail.entity'

@Injectable()
export class DetailsService {
  constructor(@InjectRepository(Detail) private detailsRepository: Repository<Detail>) {}

  async getDetails(): Promise<Detail[]> {
    return await this.detailsRepository.find()
  }

  async getDetail(_id: number): Promise<Detail[]> {
    return await this.detailsRepository.find({
      where: [{ id: _id }],
    })
  }

  async createDetail(detail: Detail) {
    return this.detailsRepository.save(detail)
  }

  async updateDetail(detail: Detail) {
    this.detailsRepository.save(detail)
  }

  async deleteEvent(detail: Detail) {
    this.detailsRepository.delete(detail)
  }
}
