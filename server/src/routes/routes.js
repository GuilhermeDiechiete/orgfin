const router = require('express').Router()

const UserController = require('../controllers/UserController')
const CategoryController = require('../controllers/CategoryController')
const ExpensesController = require('../controllers/ExpensesController')
const PaymentController = require('../controllers/PaymentController')
const AuthController = require('../controllers/AuthController')

const { verifyToken } = require('../fragments/token')



// routes users
router.post('/users/register', UserController.register)
router.post('/users/login', UserController.login)
router.get('/users/:id',verifyToken, UserController.profile)
router.patch('/users/:id',verifyToken, UserController.edit)
router.delete('/users/:id',verifyToken, UserController.delete)
router.patch('/users/pass/:id',verifyToken, UserController.editPass)

router.post('/validate', verifyToken, AuthController.validate)

// routes categories
router.get('/categories/categorywithexpenses', CategoryController.getFull)
router.post('/categories/:id', CategoryController.create)
router.get('/categories/:id', CategoryController.list)
router.get('category/:id', CategoryController.category)
router.delete('/categories/:id', CategoryController.delete)

// routes expenses
router.post('/expenses/:id', ExpensesController.create)
router.get('/expenses/:id', ExpensesController.list)
router.get('/expenses/totalmonth/:id', ExpensesController.totalMonth)
router.delete('/expenses/:id', ExpensesController.delete)

// routes payments
router.post('/payments/:id', PaymentController.create)
router.get('/payments/:id', PaymentController.list)
router.delete('/payments/:id', PaymentController.delete)

module.exports = router

