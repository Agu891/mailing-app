import { Controller, Get } from '@nestjs/common';
import { EmailService } from './email.service';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { SendEmail } from '../Send/send-email-interface';
@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @ApiOperation({
    description: 'Get latests error Emails',
    summary:
      'This endpoint retrieves the last 50 emails that failed with all their respective information, error status and error messages',
  })
  @ApiOkResponse({ type: Promise<SendEmail[]> })
  @Get('/error')
  async getErrorEmails(): Promise<SendEmail[]> {
    return this.emailService.getErrorEmails();
  }
}
