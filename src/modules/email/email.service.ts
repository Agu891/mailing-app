import { Injectable } from '@nestjs/common';
import { DynamoDbService } from '../DynamoDb/DynamoDb-DI-Service';
import { SendEmail } from '../Send/send-email-interface';
@Injectable()
export class EmailService {
  constructor(private dynamoDbService: DynamoDbService) {}

  async getErrorEmails(): Promise<SendEmail[]> {
    return this.dynamoDbService.getEmails();
  }
}
