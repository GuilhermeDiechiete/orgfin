import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'TransactionsController.store') // em uso
  Route.delete('/', 'TransactionsController.destroy') // em uso
})
  .middleware('auth')
  .prefix('transaction')
