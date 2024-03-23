import { Router } from 'express';
import { getBanners, updateBanner, createBanner, getBanner } from '../controllers/bannersController';

const router = Router();

router.route('/').get(getBanners).post(createBanner);
router.route('/:id').get(getBanner).put(updateBanner);

export const bannersRoutes = router;
