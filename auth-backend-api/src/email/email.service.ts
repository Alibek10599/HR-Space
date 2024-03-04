import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { User } from 'src/app/users/users.model';
import MailService, { MailDataRequired } from '@sendgrid/mail';

@Injectable()
export class EmailService {
  private emailConfig: any;
  private sendGridService: any;
  constructor(protected readonly configService: ConfigService) {
    this.emailConfig = this.configService.get('email');
    this.sendGridService = MailService.setApiKey(this.emailConfig.sendGridKey);
  }

  async sendRegistrationEmail(user: User) {
    const msg: MailDataRequired = {
      to: user.email,
      from: this.emailConfig.sender,
      subject: 'Comple your registration',
      templateId: this.emailConfig.templateId,
      dynamicTemplateData: {
        inviteLink: `https://test-space.tredo.co/invite?id=${user.id}`,
      },
    };
    try {
      await this.sendGridService.send(msg);
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async resetPasswordEmail(password: string, email: string) {
    const msg: MailDataRequired = {
      to: email,
      from: this.emailConfig.sender,
      subject: 'Reset your password',
      templateId: this.emailConfig.resetpasswordTemplate,
      dynamicTemplateData: {
        password,
      },
    };
    try {
      await this.sendGridService.send(msg);
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async sendPasswordEmail(password: string, email: string) {
    const msg: MailDataRequired = {
      to: email,
      from: this.emailConfig.sender,
      subject: 'Your password',
      templateId: this.emailConfig.passwordTemplate,
      dynamicTemplateData: {
        password,
      },
    };
    try {
      await this.sendGridService.send(msg);
    } catch (e) {
      throw new RpcException(e);
    }
  }
}
