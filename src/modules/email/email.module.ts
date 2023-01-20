import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { DynamoDbService } from '../DynamoDb/DynamoDb-DI-Service';
@Module({
  controllers: [EmailController],
  providers: [EmailService, DynamoDbService],
})
export class EmailModule {}
