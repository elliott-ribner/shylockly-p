import goCardlessModule from '../third-party-modules/go.cardless/index'
import { CreateEventDto } from '../events/create.event.dto'
import { ScheduleService } from '../scheduler'
import { SchedulerRegistry } from '@nestjs/schedule'
import { PaymentType } from '../payments/payment.type'
import { CustomerType } from '../customers/customer.type'
import { User } from 'src/users/user.entity'
// await findGocardlessPayment();
// 		await findGocardlessMandate();
// 		await findGocardlessCustomer();
// 		await findBillingCustomer();
// 		await checkForExistingTickets();

// if ([undefined, null, {}].includes(zendeskTicket) === true) {
//   await storePayment();
//   await retryFailedPayment();
//   await createZendeskTicket();
//   await paymentDunning();
// } else {
//   await storePayment();
//   await flagCustomerForReview({
//     description:
//       "Customer has an open zendesk ticket, first attempt to collect payment.",
//   });
// }

export default class FailedPaymentWorkfow {
  event: CreateEventDto
  paymentId: string
  profileID: string
  mandateId: string
  customerId: string
  customer: CustomerType
  billingCustomer: User
  mandate: string
  payment: PaymentType
  retriedPayment: string
  zendeskTicket: string
  failedPaymentHistory: string

  constructor(event: CreateEventDto) {
    this.event = event
    this.clientSecret = 'efjfjfj22j2j2'
    //this.paymentId = null; //not needed?
    this.profileID = '5afb17a1529ef211b4f0e6d' // fake profileID
    // this.mandateId = null; //not needed?
    // this.customerId = null; //not needed?
    this.billingCustomer = null
    this.customer = null
    this.payment = null
    this.retriedPayment = null
    this.zendeskTicket = null
    this.failedPaymentHistory = null
  }

  checkForExistingTickets() {
    // TODO add zendesk check for tickets
    return null
  }

  createZendeskTicket() {
    // TODO create zendesk tickets
    return null
  }

  retryFailedPayment() {
    return null
  }

  addPaymentJob() {
    const retry_number = this.payment.metadata.retry_number || 0
    const serv = new ScheduleService(new SchedulerRegistry())
    serv.addJob('time', 'retry_payment', async () => {
      await goCardlessModule.retryPayment(
        this.payment.id,
        retry_number,
        this.billingCustomer && this.billingCustomer.access_token,
      )
    })
  }

  async run() {
    const failedPaymentResult = await goCardlessModule.getDataFromPaymentEvent(
      this.event,
      this.billingCustomer && this.billingCustomer.access_token,
    )
    const { payment, customer, mandate } = failedPaymentResult
    this.customer = customer
    this.mandate = mandate
    this.payment = payment
    await this.checkForExistingTickets()
    await this.createZendeskTicket()
    // await this.paymentDunning(); do we need this
    if (payment.metadata.retry_numer < 3) {
      await this.retryFailedPayment()
    } else {
      // do something, we cant retry payment
    }
  }
}
