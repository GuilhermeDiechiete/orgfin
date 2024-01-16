import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'TransactionsController.store')
  Route.delete('/', 'TransactionsController.destroy')
})
  .middleware('auth')
  .prefix('transaction')
