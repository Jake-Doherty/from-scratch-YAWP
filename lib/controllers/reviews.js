const { Router } = require('express');
const authenticate = require('../middleware/authenticate.js');
const reviewOwner = require('../middleware/review-owner.js');
const { Review } = require('../models/Review.js');

module.exports = Router().delete(
  '/:id',
  [authenticate, reviewOwner],
  async (req, res, next) => {
    try {
      const review = await Review.deleteByID(req.params.id);
      if (!review) next();
      res.status(204);
      res.send();
    } catch (e) {
      next(e);
    }
  }
);
