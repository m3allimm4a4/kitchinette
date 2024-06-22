import { environment } from '../environments/environment';
import brevo from '@getbrevo/brevo';

export const sendEmail = async (subject: string, to: string[], body: string) => {
  const apiInstance = new brevo.TransactionalEmailsApi();
  apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, environment.brevoApiKey);

  const sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = body;
  sendSmtpEmail.sender = { email: environment.senderEmail };
  sendSmtpEmail.to = to.map(email => {
    return { email: email };
  });

  const res = await apiInstance.sendTransacEmail(sendSmtpEmail);
  console.log(res);
};
