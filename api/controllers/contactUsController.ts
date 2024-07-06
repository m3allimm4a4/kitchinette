import { RequestHandler } from 'express';
import { catchAsync } from '../shared/catchAsync';
import { sendEmail } from '../shared/mail-sender';
import { environment } from '../environments/environment';

export const contactUs: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const { subject } = req.body;

  res.render('contact-us', req.body, async (err, html) => {
    if (err) {
      console.error(err);
      res.status(500).send('Something went wrong. Try again later.');
      return;
    }
    await sendEmail(subject, [environment.senderEmail], html);
    res.status(200).send();
  });
});
