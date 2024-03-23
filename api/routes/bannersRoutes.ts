import { Router } from 'express';
import { getBanners, updateBanner } from '../controllers/bannersController';

const router = Router();

router.route('/').get(getBanners);
router.route('/:id').put(updateBanner);

export const bannersRoutes = router;
