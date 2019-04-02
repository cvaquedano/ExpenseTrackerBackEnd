
var db = require('./pgpool.js');
var pool = db.getPool();

const getTransaction = (request, response) => {
    pool.query('select t.*,c.name as categoryname from transaction t inner join category c on t.categoryid=c.id  ORDER BY t.Id ASC', (error, results) => {
      if (error) {
        console.log(error.message)
        response.status(500).send(error.message)
      }
      response.status(200).json(results.rows)
    })
  }

  const getTransactionById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('select t.*,c.name as categoryname from transaction t inner join category c on t.categoryid=c.id  WHERE t.id = $1', [id], (error, results) => {
      if (error) {
        console.log(error.message)
        response.status(500).send(error.message)
      }
      response.status(200).json(results.rows)
    })
  }

  const createTransaction = (request, response) => {
    const { description, categoryid, amount, date } = request.body
  
    pool.query('INSERT INTO transaction ( description, categoryid, amount, date) VALUES ($1, $2, $3,$4) RETURNING *', [description, categoryid, amount, date], (error, results) => {
      if (error) {
        console.log(error.message)
        response.status(500).send(error.message)
      }
      response.status(201).send(results.rows[0])
    })
  }
  
  const updateTransaction = (request, response) => {
    const id = parseInt(request.params.id)
    const { description, categoryid, amount, date } = request.body
  
    pool.query(
      'UPDATE transaction SET description = $1, categoryid = $2, amount=$3, date=$4 WHERE Id = $5 RETURNING *',
      [description, categoryid, amount, date, id],
      (error, results) => {
        if (error) {
          console.log(error.message)
          response.status(500).send(error.message)
        }
        response.status(200).send(results.rows[0])
      }
    )
  }
  
  const deleteTransaction = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM transaction WHERE Id = $1', [id], (error, results) => {
      if (error) {
        console.log(error.message)
          response.status(500).send(error.message)
      }
      response.status(200).send(`transactionId deleted with ID: ${id}`)
    })
  }
  
  module.exports = {
    getTransaction: getTransaction,
    getTransactionById: getTransactionById,
    createTransaction: createTransaction,
    updateTransaction: updateTransaction,
    deleteTransaction: deleteTransaction,
  }