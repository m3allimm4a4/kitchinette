import { environment } from '../environments/environment';

export const sendEmail = async (subject: string, to: string[], body: string) => {
  const brevo = require('@getbrevo/brevo');
  const apiInstance = new brevo.TransactionalEmailsApi();
  apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, environment.brevoApiKey);

  const sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = body;
  sendSmtpEmail.sender = { email: environment.senderEmail };
  sendSmtpEmail.to = to.map(email => {
    return { email: email };
  });
  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
  } catch (error) {
    console.error('Error sending email');
    console.error(error);
  }
};
