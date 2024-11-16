import { Router } from 'express';
import { getBanners, updateBanner, createBanner, getBanner } from '../controllers/bannersController';
import { auth } from '../middlewares/auth.middleware';
import { UserRole } from '../interfaces/user.interface';

const router = Router();

router
  .route('/')
  .get(getBanners)
  .post(auth([UserRole.ADMIN]), createBanner);
router
  .route('/:id')
  .get(getBanner)
  .put(auth([UserRole.ADMIN]), updateBanner);

export const bannersRoutes = router;
