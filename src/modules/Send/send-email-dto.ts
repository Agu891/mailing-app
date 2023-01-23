import { IsEmail, IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class SendEmailsDto {
  @ApiProperty({
    description: 'Type of email, can choose html or normal',
    default: 'normal',
  })
  @IsString()
  type?: string;

  @ApiProperty({ description: 'Who receives the Email' })
  @IsEmail()
  receiver: string;

  @ApiProperty({ description: 'Carbon copy sent to other addresses' })
  @IsArray()
  @IsString({ each: true })
  cc: string[];

  @ApiProperty({ description: 'Who sends the Email' })
  @IsEmail()
  sender: string;

  @ApiProperty({ description: 'Body of Email which contains the message' })
  @IsString()
  body: string;

  @ApiProperty({ description: 'Title of the Email' })
  @IsString()
  subject: string;
}
