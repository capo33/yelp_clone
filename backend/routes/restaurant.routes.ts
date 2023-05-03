import express from 'express';

import * as restaurantController from '../controllers/restaurantController';

const router = express.Router();

router.get('/', restaurantController.getRestaurants);
router.get('/:id', restaurantController.getRestaurant);
router.post('/', restaurantController.createRestaurant);
router.put('/:id', restaurantController.updateRestaurant);
router.delete('/:id', restaurantController.deleteRestaurant);
router.post('/:id/addReview', restaurantController.addReview);
router.delete('/deleteReview/:id', restaurantController.deleteReview);

export default router;