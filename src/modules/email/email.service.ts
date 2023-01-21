import { Injectable } from '@nestjs/common';
import { DynamoDbService } from '../DynamoDb/DynamoDb-DI-Service';

@Injectable()
export class EmailService {
  constructor(private dynamoDbService: DynamoDbService) {}

  async getErrorEmails(): Promise<string> {
    //*Revisar promises
    return this.dynamoDbService.getEmails();
  }
}
