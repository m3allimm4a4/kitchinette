import { Router } from 'express';
import { getSlider, updateSlider } from '../controllers/sliderController';

const router = Router();

router.route('/').get(getSlider);
router.route('/:id').get(updateSlider);

export const sliderRoutes = router;
