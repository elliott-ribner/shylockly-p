import { Injectable } from '@nestjs/common'
import { CustomerType } from './customer.type'
import GoCardless from '../third-party-modules/go.cardless'

@Injectable()
export class CustomersService {
  async getCustomers(token: string): Promise<CustomerType[]> {
    return GoCardless.getCustomers(token)
  }

  async getCustomer(_id: string, token: string): Promise<CustomerType> {
    return GoCardless.getCustomer(_id, token)
  }
}
