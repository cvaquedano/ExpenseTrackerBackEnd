const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const category = require('./queries/category-query')
const transaction = require('./queries/transaction-query')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.get('/', (request, response) => {
    response.json({ info: 'Expense Tracker Api' })
  })

  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })

  app.get('/category', category.getCategories)
app.get('/category/:id', category.getCategoryById)
app.post('/category', category.createCategory)
app.put('/category/:id', category.updateCategory)
app.delete('/category/:id', category.deleteCategory)

app.get('/transaction', transaction.getTransaction)
app.get('/transaction/:id', transaction.getTransactionById)
app.post('/transaction', transaction.createTransaction)
app.put('/transaction/:id', transaction.updateTransaction)
app.delete('/transaction/:id', transaction.deleteTransaction)