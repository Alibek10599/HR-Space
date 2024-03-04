import { Env } from 'src/core/utils/env';

export function email() {
  return {
    sendGridKey: Env.readString('SENDGRID_API_KEY'),
    sender: Env.readString('SENDGRID_SENDER'),
    templateId: Env.readString('SENDGRID_TEMPLATE_ID'),
    resetpasswordTemplate: Env.readString('PASSWORD_TEMPLATE_ID'),
    sendPasswordTemplate: Env.readString('SEND_PASSWORD_TEMPLATE_ID'),
  };
}
