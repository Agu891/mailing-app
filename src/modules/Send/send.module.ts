import { Module } from '@nestjs/common';
import { MailingController } from './send.controller';
import { MailingService } from './send.service';
import { DynamoDbService } from '../DynamoDb/DynamoDb-DI-Service';
import { SendEmailService } from '../SES/send-email';
@Module({
  controllers: [MailingController],
  providers: [MailingService, DynamoDbService, SendEmailService],
})
export class MailingModule {}
