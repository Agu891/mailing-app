import { SendEmailCommand } from '@aws-sdk/client-ses';
import { sesClient } from './sesClient';

import { SendEmail } from '../Send/send-email-interface';
const createSendEmailCommand = (params: SendEmail) => {
  if (params.type === 'html') {
    console.log('mails enviados con HTML tags');
    return new SendEmailCommand({
      Destination: {
        CcAddresses: params.cc,
        ToAddresses: [params.receiver],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `${params.body}`,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `${params.subject}`,
        },
      },
      Source: params.sender,
      ReplyToAddresses: [],
    });
  } else {
    console.log('mails enviados');
    return new SendEmailCommand({
      Destination: {
        CcAddresses: params.cc,
        ToAddresses: [params.receiver],
      },
      Message: {
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: `${params.body}`,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `${params.subject}`,
        },
      },
      Source: params.sender,
      ReplyToAddresses: [],
    });
  }
};
export class SendEmailService {
  SendEmail = async (params: SendEmail) => {
    const sendEmailCommand = createSendEmailCommand(params);

    try {
      await sesClient.send(sendEmailCommand);
    } catch (error) {
      console.error('Failed to send email.', error);

      params.error_message = `${error}`;
      return error;
    }
  };
}
