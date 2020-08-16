import { DetailType } from './details/detail.type'
import { LinkType } from './links/link.type'

export class CreateEventDto {
  id: string
  action: string
  created_at: string
  go_cardless_id?: string
  resource_type: string
  metadata: string
  details: DetailType
  links: LinkType
}
