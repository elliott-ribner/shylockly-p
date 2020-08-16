import { Injectable, Logger } from '@nestjs/common'
import { IMandate } from './mandate.entity'
import GoCardless from '../third-party-modules/go.cardless'

@Injectable()
export class MandatesService {
  // Creating an instance of the logger specific to our class - rather than using the static logger methods - shows better context in log messages
  private readonly logger = new Logger(MandatesService.name)

  async getMandates(token: string): Promise<IMandate[]> {
    return GoCardless.getMandates(token)
  }

  async getMandate(_id: string, token: string): Promise<IMandate> {
    return GoCardless.getMandate(_id, token)
  }
}
