import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
@Injectable()
export class MailService {
  sendMail(to: string, subject: string, html: string) {
    const transport = this.getTransport();
    return transport.sendMail({
      to,
      from: 'bxi@bxi.com',
      subject,
      html,
    });
  }

  getTransport() {
    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'shreyansh@unada.io',
        pass: 'otmqasyglxpxpazv',
      },
    });
  }
}
