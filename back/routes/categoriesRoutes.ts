import { Router } from 'express';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../controllers/categoriesController';
import { auth } from '../middlewares/auth.middleware';
import { UserRole } from '../interfaces/user.interface';

const router = Router();

router
  .route('/')
  .get(getCategories)
  .post(auth([UserRole.ADMIN]), createCategory);
router
  .route('/:id')
  .delete(auth([UserRole.ADMIN]), deleteCategory)
  .put(auth([UserRole.ADMIN]), updateCategory);

export const categoriesRoutes = router;
