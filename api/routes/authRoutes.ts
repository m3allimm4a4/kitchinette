import { Router } from 'express';
import { login, signUp, verifyEmail } from '../controllers/authController';

const router = Router();

router.route('/login').post(login);
router.route('/sign-up').post(signUp);
router.route('/verify-email').post(verifyEmail);

export const authRoutes = router;
