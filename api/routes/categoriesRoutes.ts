import { Router } from 'express';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../controllers/categoriesController';

const router = Router();

router.route('/').get(getCategories).post(createCategory);
router.route('/:id').delete(deleteCategory).put(updateCategory);

export const categoriesRoutes = router;
