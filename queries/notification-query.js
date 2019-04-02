
var db = require('./pgpool.js');
var pool = db.getPool();

const getNotification = (request, response) => {
    pool.query('select * from notifications', (error, results) => {
      if (error) {
        console.log(error.message)
        response.status(500).send(error.message)
      }
      response.status(200).json(results.rows)
    })
  }

  module.exports = {
    getNotification: getNotification,
  
  }