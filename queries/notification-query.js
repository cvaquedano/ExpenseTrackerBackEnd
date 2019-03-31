const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ExpenseTracker',
  password: 'chvb',
  port: 5432,
})

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