import { Router } from 'express';
import { uniqueEmail } from '../controllers/validationController';

const router = Router();

router.route('/unique-email').get(uniqueEmail);

export const validationRoutes = router;
