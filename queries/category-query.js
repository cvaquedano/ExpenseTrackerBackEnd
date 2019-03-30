const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ExpenseTracker',
  password: 'chvb',
  port: 5432,
})

const getCategories = (request, response) => {
    pool.query('SELECT * FROM category ORDER BY id ASC', (error, results) => {
      if (error) {
        console.log(error.message)
        response.status(500).send(error.message)
      }
      response.status(200).json(results.rows)
    })
  }

  const getCategoryById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM category WHERE id = $1', [id], (error, results) => {
      if (error) {
        console.log(error.message)
        response.status(500).send(error.message)
      }
      response.status(200).json(results.rows)
    })
  }

  const createCategory = (request, response) => {
    const { name, description, type,budget } = request.body
  
    pool.query('INSERT INTO category (name, description, type, budget) VALUES ($1, $2, $3,$4) RETURNING *', [name, description, type,budget], (error, results) => {
      if (error) {
        console.log(error.message)
        response.status(500).send(error.message)
      }
      response.status(201).send(results.rows[0])
    })
  }
  
  const updateCategory = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, description, type,budget } = request.body
  
    pool.query(
      'UPDATE category SET name = $1, description = $2, type=$3, budget=$4 WHERE id = $5 RETURNING *',
      [name, description, type, budget, id],
      (error, results) => {
        if (error) {
          console.log(error.message)
          response.status(500).send(error.message)
        }
        response.status(200).send(results.rows[0])
      }
    )
  }
  
  const deleteCategory = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM category WHERE id = $1', [id], (error, results) => {
      if (error) {
        console.log(error.message)
          response.status(500).send(error.message)
      }
      response.status(200).send(`categoryid deleted with ID: ${id}`)
    })
  }
  
  module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
  }