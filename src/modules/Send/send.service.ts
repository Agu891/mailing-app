import { Injectable, BadRequestException } from '@nestjs/common';
import { SendEmailService } from '../SES/send-email';
import { SendEmail } from './send-email-interface';
import { DynamoDbService } from '../DynamoDb/DynamoDb-DI-Service';

@Injectable()
export class MailingService {
  constructor(
    private sendEmailService: SendEmailService,
    private dynamoDbService: DynamoDbService,
  ) {}

  async sendEmails(body: SendEmail): Promise<string> {
    //*Revisar promesas
    if (
      !(await this.sendEmailService.SendEmail(body).then((res) => res?.Error))
    ) {
      body.status = 'SUCCESS';
      body.error_message = 'No hubo errores en este mensaje';
      await this.dynamoDbService.addEmail(body);
      return 'Mensajes enviados correctamente';
    } else {
      body.status = 'ERROR';
      await this.dynamoDbService.addEmail(body);
      throw new BadRequestException(
        'Algo salio mal al intentar enviar los Email',
      );
    }
  }
}
