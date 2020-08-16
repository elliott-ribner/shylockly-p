import { Injectable } from '@nestjs/common'
import { PaymentType } from './payment.type'
import GoCardless from '../third-party-modules/go.cardless'

@Injectable()
export class PaymentsService {
  async getPayments(token: string): Promise<PaymentType[]> {
    return GoCardless.getPayments(token)
  }

  async getPayment(_id: string, token: string): Promise<PaymentType> {
    return GoCardless.getPayment(_id, token)
  }
}
