import request from '../../request'

const url = 'https://api.sendgrid.com/v3/mail/send'
const options = {
  auth: {
    bearer: process.env.SENDGRID_API_TOKEN,
  },
  'content-type': 'application/json',
}

export const sendEmail = async ({
  toEmail,
  toName,
  subject,
  fromEmail,
  fromName,
  replyToEmail,
  replyToName,
  contentValue,
}) => {
  const body = {
    personalizations: [{ to: [{ email: toEmail, name: toName }], subject: subject }],
    content: [{ type: 'text/plain', value: contentValue }],
    from: { email: fromEmail, name: fromName },
    reply_to: { email: replyToEmail, name: replyToName },
  }
  const optionExtension = {
    body,
    json: true,
  }
  const resp = await request.rp({
    method: 'POST',
    url,
    ...optionExtension,
    ...options,
  })
  return resp
}
