import { IsEmail, IsString, IsArray } from 'class-validator';

export class SendEmailsDto {
  /* 
    TODO 
      Falta swagger annotations
      Ver cuales son los requeridos y opcionales
      falta el type, si es normal o html
      Ver los que son requeridos y no requeridos
      Agregar el tipo de cc, cada string es un email, cada string del array debe ser validado.
  */
  @IsString()
  type?: string;

  @IsEmail()
  receiver: string;

  @IsArray()
  @IsString({ each: true })
  cc: string[];

  @IsEmail()
  sender: string;

  @IsString()
  body: string;

  @IsString()
  subject: string;
}
