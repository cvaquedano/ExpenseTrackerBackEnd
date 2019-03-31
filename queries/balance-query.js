const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ExpenseTracker',
  password: 'chvb',
  port: 5432,
})


const getBalanceByMonth = (request, response) => {
    const id = parseInt(request.params.id)
    console.log(id);
    pool.query('SELECT * from public.get_monthly_balance($1)', [id], (error, results) => {
      if (error) {
        console.log(error.message)
      
        response.status(500).send(error.message)
      }
      response.status(200).json(results.rows)
    })
  }

  module.exports = {
    getBalanceByMonth: getBalanceByMonth
 
  }