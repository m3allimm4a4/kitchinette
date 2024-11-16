import { Router } from 'express';
import { contactUs } from '../controllers/contactUsController';

const router = Router();

router.route('/').post(contactUs);

export const contactUsRoutes = router;
