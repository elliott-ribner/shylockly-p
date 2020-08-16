import { mandateEventWorkflow } from './mandate.event.workflow'
import { paymentFailedEventWorkflow } from './payment.failed.workflow'
import { paymentEventWorkflow } from './payment.event.workflow'

export const handleEvent = async ({ event, rule }) => {
  // this should come from rule collection in database, hard coded for now.
  switch (event.resourceType) {
    case 'mandates':
      await mandateEventWorkflow({
        event,
        rule,
      })
      break
    case 'payments':
      if (event.action === 'created') {
        await paymentEventWorkflow({
          event,
          rule,
        })
      }
      if (event.action === 'customer_approval_granted') {
        await paymentEventWorkflow({
          event,
          rule,
        })
      }
      if (event.action === 'customer_approval_denied') {
        await paymentEventWorkflow({
          event,
          rule,
        })
      }
      if (event.action === 'submitted') {
        await paymentEventWorkflow({
          event,
          rule,
        })
      }
      if (event.action === 'confirmed') {
        // paymentConfirmedWorkflow(
        //   {
        //     paymentID: event.links.payment,
        //     description: event.details.description,
        //     cause: event.details.cause,
        //   },
        //   (err, res) => {
        //     if (err) {
        //       return reject(err);
        //     }
        //     return resolve(res);
        //   },
        // );
      }
      if (event.action === 'cancelled') {
        await paymentEventWorkflow({
          event,
          rule,
        })
      }
      if (event.action === 'failed') {
        await paymentFailedEventWorkflow({
          event,
          rule,
        })
      }
      if (event.action === 'charged_back') {
        await paymentEventWorkflow({
          event,
          rule,
        })
      }
      if (event.action === 'chargeback_cancelled') {
        await paymentEventWorkflow({
          event,
          rule,
        })
      }
      if (event.action === 'paid_out') {
        await paymentEventWorkflow({
          event,
          rule,
        })
      }
      if (event.action === 'late_failure_settled') {
        await paymentEventWorkflow({
          event,
          rule,
        })
      }
      if (event.action === 'chargeback_settled') {
        await paymentEventWorkflow({
          event,
          rule,
        })
      }
      if (event.action === 'resubmission_requested') {
        await paymentEventWorkflow({
          event,
          rule,
        })
      }
      break

    default:
      return
  }
}
