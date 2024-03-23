import { Router } from 'express';
import { getBrands } from '../controllers/brandsController';

const router = Router();

router.route('/').get(getBrands);

export const brandsRoutes = router;
