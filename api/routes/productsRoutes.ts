import { Router } from 'express';
import {
  createProduct,
  deleteProducts,
  getProduct,
  getProducts,
  updateProduct,
} from '../controllers/productsController';

const router = Router();

router.route('/').get(getProducts).post(createProduct);
router.route('/:id').get(getProduct).put(updateProduct).delete(deleteProducts);

export const productsRoutes = router;
