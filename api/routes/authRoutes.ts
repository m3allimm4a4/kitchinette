import { Router } from 'express';
import { login, signUp } from '../controllers/authController';

const router = Router();

router.route('/login').post(login);
router.route('/sign-up').post(signUp);

export const authRoutes = router;
