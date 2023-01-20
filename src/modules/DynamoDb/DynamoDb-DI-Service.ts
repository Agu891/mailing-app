// Import required AWS SDK clients and commands for Node.js
import { PutItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { ddbClient } from './ddbClient';
import { Injectable } from '@nestjs/common';
import { SendEmail } from '../Send/send-email-interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DynamoDbService {
  async addEmail(params: SendEmail) {
    const uuid = uuidv4();
    const dateMiliseconds = new Date(Date.now());
    const date = dateMiliseconds.toUTCString();
    const paramsEmail = {
      TableName: 'Emails',
      Item: {
        email_id: { S: uuid },
        subject: { S: params.subject },
        sender: { S: params.sender },
        receiver: { S: params.receiver },
        cc: { SS: params.cc },
        email_body: { S: params.body },
        email_status: { S: params.status },
        email_date: { S: date },
        error_message: { S: params.error_message },
      },
    };
    try {
      const data = await ddbClient.send(new PutItemCommand(paramsEmail));
      console.log(data);

      return data;
    } catch (err) {
      console.error(err);
    }
  }

  async getEmails() {
    const params = {
      KeyConditionExpression: 'email_status  = :topic',
      ExpressionAttributeValues: {
        ':topic': { S: 'ERROR' },
      },
      ScanIndexForward: false,
      ProjectionExpression:
        'email_id, subject, sender, receiver, email_body, email_status, email_date, error_message',
      TableName: 'Emails',
    };

    try {
      const data = await ddbClient.send(new QueryCommand(params));
      const dataToJson = data.Items.map((items) => unmarshall(items));
      const firstFiftyItems = dataToJson.slice(0, 50);
      return firstFiftyItems;
    } catch (err) {
      console.log('Error', err);
      return err;
    }
  }
}
