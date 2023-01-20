import { Injectable } from '@nestjs/common';
import { DynamoDbService } from '../DynamoDb/DynamoDb-DI-Service';

@Injectable()
export class EmailService {
  constructor(private dynamoDbService: DynamoDbService) {}

  async getErrorEmails() {
    return this.dynamoDbService.getEmails();
  }
}
