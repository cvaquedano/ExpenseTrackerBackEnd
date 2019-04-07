
var pg = require('pg');
var pool;
var config = {
    user: 'postgres',
    host: 'postgresinstance.cxwuveqjjlbn.us-east-2.rds.amazonaws.com',
    database: 'expensetracker',
    password: 'chvb2002*',
    port: 5432,
};

module.exports = {
    getPool: function () {
      if (pool) return pool; 
      pool = new pg.Pool(config);
      return pool;
}
}