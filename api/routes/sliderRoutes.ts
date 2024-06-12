import { Router } from 'express';
import { getSlider, updateSlider } from '../controllers/sliderController';
import { auth } from '../middlewares/auth.middleware';
import { UserRole } from '../interfaces/user.interface';

const router = Router();

router.route('/').get(getSlider);
router.route('/:id').get(auth([UserRole.ADMIN]), updateSlider);

export const sliderRoutes = router;
