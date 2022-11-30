const { Review } = require('../models/Review.js');

module.exports = async (req, res, next) => {
  try {
    const review = await Review.getById(req.params.id);
    if (
      review &&
      (req.user.email === 'admin' || req.user.id === review.user_id)
    ) {
      next();
    } else {
      throw new Error('You must be the creator of this review to delete!');
    }
  } catch (e) {
    e.status = 403;
    next(e);
  }
};
