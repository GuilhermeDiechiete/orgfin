const router = require('express').Router()
const { verifyToken } = require('../fragments/token')

// import controllers
const UserController = require('../controllers/UserController')
const CategoryController = require('../controllers/CategoryController')
const PaymentController = require('../controllers/PaymentController.js')
const ExpensesController = require('../controllers/ExpensesController.js')
const AuthController = require('../controllers/AuthController.js')

router.post('/validate', verifyToken, AuthController.validate)

// user routes
router.post('/user/register', UserController.register)
router.post('/user/login', UserController.login)
router.get('/user/:id', verifyToken, UserController.profile)
router.patch('/user/:id', verifyToken, UserController.editProfile)
router.delete('/user/:id', verifyToken, UserController.delete)

// category routes
router.post('/categories/:id', verifyToken, CategoryController.create) // em uso
router.get('/categories/:id', CategoryController.showCategory) // mostrar uma categoria
router.get('/categories/list/:id', CategoryController.listCategories) // mostra todas as categorias
router.delete('/categories/:id', CategoryController.deleteCategory) // deletar uma categoria pelo nome
router.get('/showCategories/:id', CategoryController.showCategories) // mostra a categoria e as despesas cadastradas

// routes payments
router.post('/payments/:id', PaymentController.create)
router.get('/payments/:id', PaymentController.list)
router.delete('/payments/:id', PaymentController.delete)

// routes expenses
router.post('/expenses/:id', ExpensesController.create) // em uso
router.get('/expenses/:id', ExpensesController.list)
router.get('/expenses/totalmonth/:id', ExpensesController.totalMonth)
router.delete('/expenses/:id', ExpensesController.delete)

module.exports = router
