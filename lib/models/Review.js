const pool = require('../utils/pool.js');

class Review {
  id;
  user_id;
  restaurant_id;
  stars;
  detail;

  constructor(row) {
    this.id = row.id;
    this.user_id = row.user_id;
    this.restaurant_id = row.restaurant_id;
    this.stars = row.stars;
    this.detail = row.detail;
  }

  static async insert({ userID, restaurantId, stars, detail }) {
    const { rows } = await pool.query(
      `
    insert into
      reviews (user_id, restaurant_id, stars, detail)
    values
      ($1, $2, $3, $4)
    returning
      *
    `,
      [userID, restaurantId, stars, detail]
    );
    return new Review(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
    select
      *
    from
      reviews
    where 
      id = $1
    `,
      [id]
    );
    if (!rows[0]) return null;
    return new Review(rows[0]);
  }

  static async deleteByID(id) {
    const { rows } = await pool.query(
      `
    delete from
      reviews
    where
      id = $1
    returning
      *
    `,
      [id]
    );
    if (!rows[0]) return null;
    return new Review(rows[0]);
  }
}

module.exports = { Review };
