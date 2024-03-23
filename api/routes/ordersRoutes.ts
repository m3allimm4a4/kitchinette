import { Router } from 'express';
import { createOrder, getOrder, getOrders } from '../controllers/ordersController';

const router = Router();

router.route('/').get(getOrders).post(createOrder);
router.route('/:id').get(getOrder);

export const ordersRoutes = router;
