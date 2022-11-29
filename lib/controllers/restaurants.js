const { Router } = require('express');
const authenticate = require('../middleware/authenticate.js');
const Restaurant = require('../models/Restaurant.js');
const { Review } = require('../models/Review.js');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const restaurants = await Restaurant.getAll();
      res.json(restaurants);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const restaurant = await Restaurant.getById(req.params.id);
      await restaurant.addReviews();
      res.json(restaurant);
    } catch (e) {
      next(e);
    }
  })
  .post('/:id/reviews', authenticate, async (req, res, next) => {
    try {
      const newReview = await Review.insert({
        userID: req.params.id,
        restaurantId: req.user.id,
        detail: req.body.detail,
      });
      res.json(newReview);
    } catch (e) {
      next(e);
    }
  });
