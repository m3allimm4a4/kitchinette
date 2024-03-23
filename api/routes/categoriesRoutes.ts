import { Router } from 'express';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../controllers/categoriesController';

const router = Router();

router.route('/').get(getCategories).post(createCategory).put(updateCategory);
router.route('/:id').delete(deleteCategory);

export const categoriesRoutes = router;
