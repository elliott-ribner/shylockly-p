import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Link } from './link.entity'

@Injectable()
export class LinksService {
  constructor(@InjectRepository(Link) private linksRepository: Repository<Link>) {}

  async getLinks(): Promise<Link[]> {
    return await this.linksRepository.find()
  }

  async getLink(_id: number): Promise<Link[]> {
    return await this.linksRepository.find({
      where: [{ id: _id }],
    })
  }

  async createLink(link: Link) {
    return this.linksRepository.save(link)
  }

  async updateLink(link: Link) {
    this.linksRepository.save(link)
  }

  async deleteEvent(link: Link) {
    this.linksRepository.delete(link)
  }
}
