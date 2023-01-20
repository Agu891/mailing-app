import { Controller, Post, Body } from '@nestjs/common';
import { MailingService } from './send.service';
import { SendEmailsDto } from './send-email-dto';

@Controller('mailing')
export class MailingController {
  constructor(private mailingService: MailingService) {}

  /* 
    TODO 
      Falta swagger annotations
      Falta definir el DTO en las annotations
      Falta definir el return de los metodos

      @ApiOperation({
        description: 'Find all islands category',
        summary: 'Find all islands category',
      })
      @ApiOkResponse({ type: FindAllResponse<IslandCategoryDocument> })
  */
  @Post()
  async sendEmails(@Body() body: SendEmailsDto) {
    return this.mailingService.sendEmails(body);
  }
}
