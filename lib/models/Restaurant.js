const pool = require('../utils/pool.js');

module.exports = class Restaurant {
  id;
  name;
  cuisine;
  cost;
  image;
  website;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.cuisine = row.cuisine;
    this.cost = row.cost;
    this.image = row.image;
    this.website = row.website;
  }

  static async getAll() {
    const { rows } = await pool.query(`
		select
			*
		from
			restaurants
		`);
    if (!rows) return;
    return rows.map((row) => new Restaurant(row));
  }
};
