import { Controller, Post, Body } from '@nestjs/common';
import { MailingService } from './send.service';
import { SendEmailsDto } from './send-email-dto';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';
@Controller('mailing')
export class MailingController {
  constructor(private mailingService: MailingService) {}

  @ApiOperation({
    description: 'Send Emails',
    summary: 'This endpoint sends emails to the desired  addresses',
  })
  @ApiOkResponse({ type: SendEmailsDto })
  @Post()
  async sendEmails(@Body() body: SendEmailsDto): Promise<string> {
    return this.mailingService.sendEmails(body);
  }
}
