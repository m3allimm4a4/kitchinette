import { Router } from 'express';
import { auth } from '../middlewares/auth.middleware';
import { UserRole } from '../interfaces/user.interface';
import { createColor, deleteColor, getColor, getColors, updateColor } from '../controllers/colorsController';

const router = Router();

router
  .route('/')
  .get(getColors)
  .post(auth([UserRole.ADMIN]), createColor);
router
  .route('/:id')
  .get(getColor)
  .delete(auth([UserRole.ADMIN]), deleteColor)
  .put(auth([UserRole.ADMIN]), updateColor);

export const colorsRoutes = router;
