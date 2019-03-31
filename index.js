const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const category = require('./queries/category-query')
const transaction = require('./queries/transaction-query')
 const notification = require('./queries/notification-query')
const balance = require('./queries/balance-query')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


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

app.get('/notification', notification.getNotification)

 app.get('/balance/:id', balance.getBalanceByMonth)