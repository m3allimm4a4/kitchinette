import { Router } from 'express';
import {
  createProduct,
  deleteProducts,
  getProduct,
  getProducts,
  updateProduct,
} from '../controllers/productsController';
import { auth } from '../middlewares/auth.middleware';
import { UserRole } from '../interfaces/user.interface';

const router = Router();

router
  .route('/')
  .get(getProducts)
  .post(auth([UserRole.ADMIN]), createProduct);
router
  .route('/:id')
  .get(getProduct)
  .put(auth([UserRole.ADMIN]), updateProduct)
  .delete(auth([UserRole.ADMIN]), deleteProducts);

export const productsRoutes = router;
