
import Route from '@ioc:Adonis/Core/Route'

  // em uso - painel de buscar por mes
Route.group(() => {

   Route.get('/:year/:month', 'SearchTransactionsController.getTransactionsByMonth') 
   Route.get('/total/:year/:month', 'SearchTransactionsController.getTotalTransactionsByMonth') 
   Route.get('/:year', 'SearchTransactionsController.getTotal')

})
.middleware('auth')
.prefix('gettransactions')
.where('month', {
  match: /^[1-9]|1[0-2]$/,
  cast: (month) => Number(month),
})
.where('year', {
  match: /^[2][0][2-4][4-9]$|^[2][0][3-4][0-9]$|^2050$/,
  cast: (year) => Number(year),
  })