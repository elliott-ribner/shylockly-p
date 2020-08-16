import * as React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pane, Button, Checkbox, majorScale, defaultTheme, TextInputField } from 'evergreen-ui'
import { IRule } from 'types'
import { getIsUpdatingRule } from 'store/selectors'

interface IRuleProps {
  rule: IRule
}

export default function({ rule }: IRuleProps): JSX.Element {
  const dispatch = useDispatch()
  const isUpdatingRule = useSelector(getIsUpdatingRule)

  const [organisationId] = useState(rule.organisationId)
  const [sendSlackNotice, setSendSlackNotice] = useState(rule.sendSlackNotice)
  const [slackWebhookUrl, setSlackWebhookUrl] = useState(rule.slackWebhookUrl)
  const [createZenhubTicket, setCreateZenhubTicket] = useState(rule.createZenhubTicket)
  const [retryPayment, setRetryPayment] = useState(rule.retryPayment)
  const [paymentRetryIntervals, setPaymentRetryIntervals] = useState([
    rule.retryPaymentIntervalMins1,
    rule.retryPaymentIntervalMins2,
    rule.retryPaymentIntervalMins3,
  ])
  const [failedPaymentEmailContent, setFailedPaymentEmailContent] = useState(rule.failedPaymentEmailContent)
  const [mandateEmailContent, setMandateEmailContent] = useState(rule.mandateEmailContent)
  const [failedPaymentEmailSubject, setFailedPaymentEmailSubject] = useState(rule.failedPaymentEmailSubject)
  const [mandateEmailSubject, setMandateEmailSubject] = useState(rule.mandateEmailSubject)
  const [fromEmail, setFromEmail] = useState(rule.fromEmail)
  const [fromName, setFromName] = useState(rule.fromName)
  const [replyToEmail, setReplyToEmail] = useState(rule.replyToEmail)
  const [replyToName, setReplyToName] = useState(rule.replyToName)

  const handleSubmit = async () => {
    dispatch({
      type: 'UPDATE_RULE',
      payload: {
        id: rule.id,
        organisationId: organisationId,
        sendSlackNotice,
        slackWebhookUrl,
        createZenhubTicket,
        retryPayment,
        retryPaymentIntervalMins1: retryPayment ? paymentRetryIntervals[0] : null,
        retryPaymentIntervalMins2: retryPayment ? paymentRetryIntervals[1] : null,
        retryPaymentIntervalMins3: retryPayment ? paymentRetryIntervals[2] : null,
        failedPaymentEmailContent,
        mandateEmailContent,
        failedPaymentEmailSubject,
        mandateEmailSubject,
        fromEmail,
        fromName,
        replyToEmail,
        replyToName,
      },
    })
  }

  return (
    <Pane
      display="flex"
      elevation={2}
      alignItems="flex-start"
      width="100%"
      flexDirection="column"
      padding={majorScale(2)}
      backgroundColor={defaultTheme.palette.neutral.light}
    >
      <Checkbox
        label="Send Slack Notice"
        checked={sendSlackNotice}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSendSlackNotice(e.target.checked)}
      />
      {sendSlackNotice && (
        <TextInputField
          label="Slack Webhook URL"
          value={slackWebhookUrl}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSlackWebhookUrl(e.target.value)}
        />
      )}
      <Checkbox
        label="Create Zenhub Ticket"
        checked={createZenhubTicket}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCreateZenhubTicket(e.target.checked)}
      />
      <Checkbox
        label="Retry Payment"
        checked={retryPayment}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRetryPayment(e.target.checked)}
      />

      <TextInputField
        label="Failed Payment Email Content"
        value={failedPaymentEmailContent}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFailedPaymentEmailContent(e.target.value)}
      />

      <TextInputField
        label="Mandate Email Content"
        value={mandateEmailContent}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMandateEmailContent(e.target.value)}
      />
      <TextInputField
        label="Failed Payment Email Subject"
        value={failedPaymentEmailSubject}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFailedPaymentEmailSubject(e.target.value)}
      />

      <TextInputField
        label="Mandate Email Subject"
        value={mandateEmailSubject}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMandateEmailSubject(e.target.value)}
      />
      <TextInputField
        label="From Email"
        value={fromEmail}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFromEmail(e.target.value)}
      />

      <TextInputField
        label="From Name"
        value={fromName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFromName(e.target.value)}
      />
      <TextInputField
        label="Reply To Email"
        value={replyToEmail}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReplyToEmail(e.target.value)}
      />

      <TextInputField
        label="Reply To Name"
        value={replyToName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReplyToName(e.target.value)}
      />

      {retryPayment && (
        <Pane paddingLeft={majorScale(2)}>
          <PaymentRetryIntervals
            paymentRetryIntervals={paymentRetryIntervals}
            setPaymentRetryIntervals={setPaymentRetryIntervals}
          />
        </Pane>
      )}
      <Button iconAfter="saved" onClick={handleSubmit} isLoading={isUpdatingRule}>
        Save
      </Button>
    </Pane>
  )
}

interface IPaymentRetryIntervalsProps {
  paymentRetryIntervals: number[]
  setPaymentRetryIntervals: (intervals: number[]) => void
}

function PaymentRetryIntervals({ paymentRetryIntervals, setPaymentRetryIntervals }: IPaymentRetryIntervalsProps) {
  return (
    <>
      <TextInputField
        label="Wait this number of numbers before retrying"
        value={paymentRetryIntervals[0]}
        type="number"
        min={0}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPaymentRetryIntervals([parseInt(e.target.value, 10), paymentRetryIntervals[1], paymentRetryIntervals[2]])
        }
      />
      <TextInputField
        label="Then wait..."
        disabled={!paymentRetryIntervals[0]}
        value={paymentRetryIntervals[1]}
        type="number"
        min={0}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPaymentRetryIntervals([paymentRetryIntervals[0], parseInt(e.target.value, 10), paymentRetryIntervals[2]])
        }
      />
      <TextInputField
        label="Then wait..."
        disabled={!(paymentRetryIntervals[1] && paymentRetryIntervals[1])}
        value={paymentRetryIntervals[2]}
        type="number"
        min={0}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPaymentRetryIntervals([paymentRetryIntervals[0], paymentRetryIntervals[1], parseInt(e.target.value, 10)])
        }
      />
    </>
  )
}
