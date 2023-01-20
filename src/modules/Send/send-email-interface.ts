export interface SendEmail {
  receiver: string;

  sender: string;

  type?: string;

  cc?: string[];

  subject: string;

  body: string;

  date?: Date;

  status?: string;

  error_message?: string;
}
