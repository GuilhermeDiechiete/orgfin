import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {


    Route.post('/', 'TransactionsController.store')
    Route.delete('/:id', 'TransactionsController.destroy')


}).prefix('transaction')
.middleware('auth')
.where('id', {
        match: /^[0-9]+$/,
        cast: (id) => Number(id),
    })