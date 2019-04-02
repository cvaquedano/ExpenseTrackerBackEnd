
var pg = require('pg');
var pool;
var config = {
    user: 'postgres',
    host: 'localhost',
    database: 'ExpenseTracker',
    password: 'chvb',
    port: 5432,
};

module.exports = {
    getPool: function () {
      if (pool) return pool; // if it is already there, grab it here
      pool = new pg.Pool(config);
      return pool;
}
}